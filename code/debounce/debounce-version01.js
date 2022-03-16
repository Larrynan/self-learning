// 自写防抖函数
// 1-定义函数，需要传两个参数：要执行的函数fun，需要啊啊-等待的一段时间await
function debounce(func,await){
  let timer
// 2-分析，调用这个防抖函数时应该要返回一个函数==》闭包函数
  return function () {
  
    // 5-函数一进来就清除定时器
    clearTimeout(timer)
// 3-等待时间通过延时定时器来实现
timer=setTimeout(() => {
  //  一定的延时之后执行要执行的函数
   func()
 }, await);
//  4-timeout会生成一个变量，定义一个变量去接收它


  }
}

// ===================函数执行操作=================================

let count=0;
let div=document.querySelector('#content');
function dosomeThing(){
  div.innerHTML=count++;
  
}
div.onmousemove=debounce(dosomeThing,300)
// 定时器补充：
// setTimeout()方法的返回值是一个唯一的数值，这个数值有什么用呢？
// 如果你想要终止setTimeout()方法的执行，那就必须使用 clearTimeout()方法来终止，
// 而使用这个方法的时候，系统必须知道你到底要终止的是哪一个setTimeout()方法
// (因为你可能同时调用了好几个 setTimeout()方法)，
// 这样clearTimeout()方法就需要一个参数，
// 这个参数就是setTimeout()方法的返回值(数值)，
// 用这个数值来唯一确定结束哪一个setTimeout()方法。