// 自写防抖函数
// 版本2：问题修复1：修改this指向问题，
// 这个函数里面当前this指向window对象，
// 而其他函数工具防抖函数中的this指向当前调用的对象，如果是某个盒子调用就指向这个盒子元素
function debounce(func, await) {
  let timer
  return function () {
    // 修改：改变内部的this指向
    // console.log(this,"this指向");//此处的this指向的是调用的元素
    // 1-把当前这个this拿到，也就是当前的调用函数的元素
    let _this=this
    clearTimeout(timer)
    timer = setTimeout(function(){
      // 2-修改函数中的this指向
      func.apply(_this)
    }, await);


  }
}

// ===================函数执行操作=================================

let count = 0;

let div = document.querySelector('#content');

function dosomeThing() {
  div.innerHTML = count++;
  // console.log(this,"this指向222");//此处函数中的的this指向window
  // 经过上面2-的修改此处this指向调用函数的div盒子
  console.log(this);

}
div.onmousemove = debounce(dosomeThing, 300)
// 补充：apply 、 call 、 bind 修改this指向
// apply是绑定this到指定函数或类，也可以说把函数或者类的方法和属性给到当前作用域。
/*
三者都可以改变函数的 this 对象指向
三者第⼀个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null ，
则默认指向全局 window
三者都可以传参，但是 apply 是数组，⽽ call 是参数列表，且 apply 和 call 是⼀次性传⼊参
数，⽽ bind 可以分为多次传⼊
bind 是返回绑定this之后的函数， apply 、 call 则是⽴即执⾏
 apply()方法使用时传参规则
fn.apply(this,array)在执行过程中，array参数会被转化成一个一个参数传递给函数fn
call()方法使用时传参规则
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
它们各自的定义：

apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。

call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。

它们的共同之处：

都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象”。

它们的不同之处：

apply：最多只能有两个参数——新this对象和一个数组argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，当然，即使只有一个参数，也要写进数组里。如果argArray不是一个有效的数组或arguments对象，那么将导致一个TypeError。如果没有提供argArray和thisObj任何一个参数，那么Global对象将被用作thisObj，并且无法被传递任何参数。

call：它可以接受多个参数，第一个参数与apply一样，后面则是一串参数列表。这个方法主要用在js对象各方法相互调用的时候，使当前this实例指针保持一致，或者在特殊情况下需要改变this指针。如果没有提供thisObj参数，那么 Global 对象被用作thisObj。 

实际上，apply和call的功能是一样的，只是传入的参数列表形式不同。

*/ 