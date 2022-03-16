//版本3-问题修复4:完善控制变量问题
//到此已经基本完成防抖函数的编写，
// 后面06的是更加严谨和多功能的补充==也就是高阶防抖函数
function debounce(func, await,immediate) {
  let timer
  return function () {
   console.log(arguments,"arguments");
    let _this=this
    let args=arguments
    // 修改：如果有定时器则清空定时器
    if(timer) clearTimeout(timer)
    //1-判断参数，是否立即执行
    if(immediate){
    // 2-如果为true则函数立即执行
    // func.apply(_this,args)//如果直接这样写，则函数不仅会立即执行，还会一直执行
    // 3-通过一个变量来控制这个一直执行的问题
     let immediateFlag = !timer
    //immediateFlag一开始为true立即去执行这个函数，但是达到指定的延时await后应该停止立即执行
    //5-达到延迟时间await毫秒之后结束立即执行，正常的按照延时来走这个函数
    timer=setTimeout(()=>{
      timer=null
    },await)
  //  4-状态成立则立即执行
   if(immediateFlag) func.apply(_this,args)
  
  }else{
      // 不会立即执行
       timer = setTimeout(function(){
      func.apply(_this,args)
    }, await);
    }
   


  }
}

// ===================函数执行操作=================================

let count = 0;
let div = document.querySelector('#content');

function dosomeThing(e) {
  div.innerHTML = count++;
  console.log(e,"事件对象eeeeee");
}
div.onmousemove = debounce(dosomeThing, 300)
// 补充：arguments 
/*

*/