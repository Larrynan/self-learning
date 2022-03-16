//版本3-问题修复5:防抖函数中的返回值和取消操作
//
function debounce(func, await, immediate) {
  // 6-取消操作最好是在函数整体返回值的基础上在编写一个cancel方法，
  // 以供调用者直接调用
  // 2-在定义个变量存放函数执行的返回值
  let timer, result;
  //  7-先定义变量接受函数返回值对象
  let decounced = function () {
    let _this = this
    let args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let immediateFlag = !timer
      timer = setTimeout(() => {
        timer = null
      }, await)
      // 3-在函数调用的地方接收返回值
      if (immediateFlag) result = func.apply(_this, args)

    } else {
      timer = setTimeout(function () {
        result = func.apply(_this, args)
      }, await);
    }
    // 4-再把这个函数执行的返回值再返回出去
    return result

  }
  // 9-给decounced对象定义一个取消防抖的函数
  decounced.cancel=function(){
    clearTimeout(timer)
    // 10-避免内存泄露清掉timer
    timer=null
  }
  // 8-返回7定义的变量对象
  return decounced
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
//11-防抖函数调用的对应修改--接收防抖函数返回值
let doSome=debounce(dosomeThing, 1000)
// 5-取消操作的调用函数
btn.onclick = function () {
  doSome.cancel()

}
// 12-高阶函数防抖
div.onmousemove = doSome
// div.onmousemove = debounce(dosomeThing, 300, true)
// 补充：arguments
/*

*/