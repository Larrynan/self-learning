// 自定义节流函数：
// 第2版、通过定时器来实现
// 次函数第一次不会触发(延迟触发)，最后会被触发
/*此处的效果相当于underscore.js库里面的节流方法_.throttle(func,wait,{leading:false,trailing:true})

*/
function throttle(func,wait){
  let _this,args,timeout;
  // 还是返回一个函数
  return function(){
    _this=this;
    args=arguments
    if(!timeout) {
     timeout = setTimeout(()=>{
      //  由于函数执行一次之后timeout就有值，则判断走不进来，所以再函数里面把timeout清空
       timeout=null
        func.apply(_this,args)
      },wait)
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
div.onmousemove = debounce(dosomeThing, 300)
/*补充：获取当前时间戳的方法
1、var timestamp = (new Date()).valueOf();
2、var timestamp=new Date().getTime()；


*/ 