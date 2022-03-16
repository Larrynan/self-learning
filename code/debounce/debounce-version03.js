//版本3-问题修复2：获取事件对象event
// 一般调用事件函数都会有一个e表示事件的某些参数但是在dosomeThing（e）这里面拿不到事件对象参数

function debounce(func, await) {
  let timer
  return function () {
  // 1-在dosomeThing(e) 这个e参数里面是拿不到这个事件对象的
  // 通过arguments对象 这个Js中执行函数中获取函数调用的实参的方法来获取
   console.log(arguments,"arguments");
  /*可以拿到对应的事件对象
  Arguments [MouseEvent, callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: MouseEvent
isTrusted: true
altKey: false
bubbles: true
button: 0
.......
  */
    let _this=this
    let args=arguments
    clearTimeout(timer)
    timer = setTimeout(function(){
      // 2-通过改变this指向的同时把这个事件对象传给函数

      func.apply(_this,args)
    }, await);


  }
}

// ===================函数执行操作=================================

let count = 0;
let div = document.querySelector('#content');

function dosomeThing(e) {
  div.innerHTML = count++;
  // console.log(this);
  // console.log(e);//undefined  此时拿不到事件对象
  // 3-此时这个e就能拿到上面传来的实参了
  console.log(e,"事件对象eeeeee");
}
div.onmousemove = debounce(dosomeThing, 300)
// 补充：arguments 
/*
是一个对应于传递给函数的参数的类数组对象。
arguments对象是所有（非箭头）函数中都可用的局部变量。
你可以使用arguments对象在函数中引用函数的参数。
此对象包含传递给函数的每个参数，第一个参数在索引0处。
例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：
arguments[0]
arguments[1]
arguments[2]
arguments对象不是一个 Array 。
它类似于Array，但除了length属性和索引元素之外没有任何Array属性。
例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];

*/