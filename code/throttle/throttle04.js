// 自定义节流函数：
// 第4版、传三个参数，控制开头和结尾是否执行的参数
function throttle(func, wait,options) {
  let _this, args, timeout;
  let oldTime = 0;//时间戳
  // 3-判断用户是否传了第三个参数
  if(!options) options={}
  // 2-提出来的函数部分
  let later = function () {
    timeout = null
    oldTime = (new Date()).valueOf()
    func.apply(_this, args)
  }
  // 还是返回一个函数
  return function () {
    // 修改this指向以及传事件对象参数
    _this = this;
    args = arguments;
    let newTime = (new Date()).valueOf()
    if(options.leading === false && !oldTime){
      // 3-如果传了控制第一次不直接执行，则让下面的判断走不进去
      oldTime=newTime
    }
    if (newTime - oldTime > wait) {
       // 注：此处代码控制第一次直接执行
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(_this, args)
      oldTime = newTime
    }
    // 4-修改最后一次执行的判断
    if (!timeout && options.trailing !== false) {
       // 注：此处代码控制最后一次的执行

      // timeout = setTimeout(() => {
      //   // 1- 如下部分提出去
      //   //  timeout=null
      //   //  oldTime=(new Date()).valueOf()
      //   //   func.apply(_this,args)
       
      // }, wait) 
      // 提出去之后的修改
      timeout=setTimeout(later,wait)

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
div.onmousemove = throttle(dosomeThing, 2000 ,{leading:false,trailing:true})
/*补充：获取当前时间戳的方法
1、var timestamp = (new Date()).valueOf();
2、var timestamp=new Date().getTime()；


*/ 