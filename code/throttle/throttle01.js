// 自定义节流函数：
// 第1版、通过时间戳来实现
// 次函数第一次会触发，最后不会被触发
/*此处的效果相当于underscore.js库里面的节流方法_.throttle(func,wait,{leading:true,trailing:false})

*/
function throttle(func,wait){
  let _this,args;
  // 1-定义之前的时间戳变量
  let previous=0;
  // 还是返回一个函数
  return function(){
    _this=this;
    args=arguments
    // 2-执行函数的时候获取当前的时间戳 ==>方法 new Date().valueOf();
    let current=(new Date()).valueOf();
    //3- 如果当前时间戳-之前的时间戳 > 设定的间隔时间 则立即去执行
   if(current - previous > wait){
    // 4-立即执行
    func.apply(_this,args)
    // 5-再把此次执行的时间赋值给之前的时间
    previous=current
   }
  }
}



// ===================函数执行操作=================================
let count = 0;
let div = document.querySelector('#content');
// 5-取消防抖操作
let btn = document.querySelector('#btn')
function dosomeThing(e) {
  div.innerHTML = count++;
  console.log(e, "事件对象eeeeee");
  // 1-如果执行的函数里面有需要的返回值
  return '想要的返回值'
}
div.onmousemove = debounce(dosomeThing, 300, true)
/*补充：获取当前时间戳的方法
1、var timestamp = (new Date()).valueOf();
2、var timestamp=new Date().getTime()；


*/ 