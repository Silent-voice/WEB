/*
    JS调用方式
        1. 内部JS，在HTML文件中编写JS代码
            <script> JS代码 </script>
        2. 外部JS
            <script src="xxx.js" type="text/javascript" async></script>
                async : 异步执行，在加载剩余页面的同时执行JS脚本(默认行为)，适合脚本与页面相对独立的情况
                defer : 延迟执行，等待页面加载介绍之后执行JS脚本
        3. 内联JS，不建议使用
            在HTML代码中调用JS函数，如 <button onclick="xxx()"></button>


    JS调用顺序控制
        1. 通过事件触发脚本调用
            DOMContentLoaded : DOM加载完成时触发，不包括样式表，图片，flash
            load : 页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成时触发
                document.addEventListener("DOMContentLoaded", function() {
                    . . .
                });
        2. 异步执行 async
            页面加载和脚本加载并行，无法控制顺序，如下例，三个脚本加载顺序不确定，容易出问题
                <script async src="js/vendor/jquery.js"></script>
                <script async src="js/script2.js"></script>
                <script async src="js/script3.js"></script>
        3. 延迟执行 defer
            页面加载 > 脚本加载，脚本按照在页面中出现的顺序加载和运行
                <script defer src="js/vendor/jquery.js"></script>
                <script defer src="js/script2.js"></script>
                <script defer src="js/script3.js"></script>

*/

/*
    函数
        1. 格式 function 函数名(参数列表){ 函数体 }
        2. 没有return语句，返回undefined
        3. arguments，函数内部内置变量，表示传给函数的参数，类似一个Array
        4. 函数调用时参数传递个数不要求与定义个数相同，运行省略参数
        5. 参数传递
            基本类型：值传递
            对象：拷贝一份地址，将地址传进去，函数内外使用两个值相同的地址变量(与引用传递不同之处在于，引用传递不拷贝地址，函数内外使用同一个地址变量)
        6. 函数属性和方法
            func.length     参数个数
            func.toString()     源码字符串
        7. eval(String)
            执行字符串源码
*/
function myFunction() {
    alert('hello');
}

function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);     // a = 1, b = 2, rest = [3, 4, 5]



/*
    函数表达式
        1. 使用匿名函数，没有定义函数名
        2. 如果定义了函数名，只能在函数内部使用 
        3. 像普通函数一样调用 myGreeting()

*/ 
var myGreeting = function() {
    alert('hello');
};      // 函数表达式需要加分号

var myButton = document.querySelector('button');
myButton.onclick = function() {
    alert('hello');
}


// 高阶函数：以函数作为参数

function add(x, y, f) {
    return f(x) + f(y);
}

let x = add(-5, 6, Math.abs);


/*
    作用域
        全局作用域
        局部作用域
            函数作用域
            块级作用域 : 使用 {} 包裹的代码块

    闭包
        1. 闭包是由函数以及声明该函数的词法环境组合而成的
        2. 该环境包含了这个闭包创建时作用域内的任何局部变量
        3. 多用于将函数与一些特定数据相绑定
        4. 闭包在处理速度和内存消耗方面对脚本性能具有负面影响，非特殊情况不建议使用

*/ 


// myFunc是对displayName()的一个实例引用，仍然维持了一个对它的词法环境(变量name存在于其中)的引用

function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();


function makeAdder(x) {
    return function(y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12


let xModule = (function (){
    let x = 1;
    let y = [1,2,3];
    function add() {
        x += 1;
        y.push(4);
        return x;
    }
    return { x, add };
})();
let xm = xModule;
xm.x = 10;
console.log(xm.x);  // 10
console.log(xm.y);  // [1,2,3]
console.log(xm.add());  // 2，闭包原理
console.log(xm.x);   // 10
console.log(xm.y);  // [1,2,3,4]    xm.y是y的一个拷贝，但都是引用(地址)，所以指向的是内存中相同的数据



/*
    错误使用案例，在循环中使用闭包
        1. 3个闭包中的函数都绑定了变量item
        2. onfocus是异步函数，执行时循环已经结束，所以3个闭包中指向的变量item已经是最后一个值 age 了，3个闭合函数的执行效果都是一样的

    解决方案
        1. 在套一层闭包函数，该闭包函数返回showHelp(help)的实例引用
        2. 使用let定义item；该样例中闭包绑定到的是for循环内部的块级作用域，let变量无法跨块，所以每个闭包引用的都是自己块内的item变量
*/ 

function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    }
}
setupHelp();

















