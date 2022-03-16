// 自定义节流函数：
// 第3版、通过定时器+时间戳来实现一个较为完整功能的节流
// 到此功能基本完成，后面04是更高阶优化的版本
function throttle(func,wait){
  // 1-定义需要使用的变量
  let _this,args,timeout;
  let oldTime=0;//时间戳
  // 还是返回一个函数
  return function(){
    // 修改this指向以及传事件对象参数
    _this=this;
    args=arguments;
    // 2-获取当前时间戳
    let newTime=(new Date()).valueOf()  
     // 8-完善：如果定时器有值，需要清除操作
      if(timeout) {
        clearTimeout(timeout)
        timeout=null
      }
    // 3-做当前时间与等待时间的判断
    if(newTime-oldTime>wait){
      // 注：此处代码控制第一次直接执行
 
      // 4-第一次立即执行
      func.apply(_this,args)
      // 5-给旧时间赋值
      oldTime=newTime
    }
    if(!timeout) {
      // 注：此处代码控制最后一次的执行
      // 6-走定时器的函数
     timeout = setTimeout(()=>{
      //  由于函数执行一次之后timeout就有值，则判断走不进来，所以再函数里面把timeout清空
       timeout=null
      //  7-走到这里之后需要吧旧时间重新赋值为当前最新的时间
       oldTime=(new Date()).valueOf()
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
div.onmousemove = throttle(dosomeThing, 2000)
/*补充：获取当前时间戳的方法
1、var timestamp = (new Date()).valueOf();
2、var timestamp=new Date().getTime()；


*/ 