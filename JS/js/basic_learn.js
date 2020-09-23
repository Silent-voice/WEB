/*
    JS调用方式
        1. 内部JS，在HTML文件中编写JS代码
            <script> JS代码 </script>
        2. 外部JS，由主线程执行，主线程与渲染线程互斥
            教程：https://www.cnblogs.com/jiasm/p/7683930.html
            <script src="xxx.js" type="text/javascript" async></script>
                async(默认) : 异步执行，在加载DOM的同时异步加载脚本，哪个脚本先加载完就先执行哪个脚本，乱序
                defer : 延迟执行，在加载DOM的同时异步加载脚本，但等待页面加载结束之后才按照JS在HTML文件中的顺序执行JS脚本
        3. 内联JS，不建议使用
            在HTML代码中调用JS函数，如 <button onclick="xxx()"></button>



        DOMContentLoaded : DOM加载完成时触发，不包括样式表，图片，flash
        load : 页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成时触发

*/

/*
    函数
        1. 格式 function 函数名(参数列表){ 函数体 }
        2. 没有return语句，返回undefined
        3. arguments，函数内部内置变量，表示传给函数的参数，类似一个Array
        4. 函数调用时参数传递个数不要求与定义个数相同
                缺少参数时会将参数设置为 undefined
                参数多时会直接忽略
        5. 参数传递
            基本类型：值传递
            对象：拷贝一份地址，将地址传进去，函数内外使用两个值相同的地址变量(与引用传递不同之处在于，引用传递不拷贝地址，函数内外使用同一个地址变量)
        6. 函数属性和方法
            func.length     参数个数
            func.toString()     源码字符串
        7. eval(String)
            执行字符串源码
        8. 在块级作用域内声明的函数类似于let，块外无法访问
*/
function myFunction() {
    alert('hello');
}

// 设置参数默认值
function showMessage(from, text = "no text given") {
    alert( from + ": " + text );
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
let myGreeting = function() {
    alert('hello');
};      // 函数表达式需要加分号

let myButton = document.querySelector('button');
myButton.onclick = function() {
    alert('hello');
}


// 高阶函数：以函数作为参数

function add(x, y, f) {
    return f(x) + f(y);
}

let x = add(-5, 6, Math.abs);


/*
    箭头函数：ES6新增
        1. 语法 : (arg1, arg2, ...argN) => expression
        2. 与传统函数的区别
            1. 箭头函数没有this，会从外部获得，即箭头函数内部的this是当前环境的上下文this
            2. 没有this所以不能使用new
            3. 没有arguments
*/

var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth;         // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
obj.getAge(); 


var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25








/*
    作用域
        全局作用域
        局部作用域
            函数作用域
            块级作用域 : 使用 {} 包裹的代码块

    词法环境
        1. 每个代码块都有一个单独的词法环境
            函数、{}、for/while/if
        2. 内部代码块的词法环境可以引用外部代码块词法环境中的属性


    闭包:
        1. 闭包是由函数以及声明该函数的词法环境组合而成的
        2. 函数不仅能访问其词法环境中的所有属性，还能访问其创建时嵌套的外部词法环境中的所有属性
        3. 本质上，函数实例对象创建时，会创建相应的引用指向其所需的外部语法环境中的变量，放入到函数实例对象的[[Scopes]]属性中
        4. 当函数实例对象被调用时，就会根据这些引用获取所需变量值
        5. 同一个父函数返回的多个闭包子函数之间是否独立，取决于多个闭包子函数中引用的外部语法环境中的变量是否唯一
    

*/ 


function f() {
    let father_field = 'f';
    return function() {
        let child_field = 'c';
        console.log(father_field + '_' + child_field);
    }
}

let g = f();    // 词法环境链  {child_field : 'c'} => {father_field : 'f'}
g();



let name = "John";
function sayHi() {
    console.log("Hi, " + name);
}
sayHi();    // 'John'
name = "Pete";
sayHi();    // "Pete"





/*
    闭包实例的独立性样例
        1. 每次调用makeCounter()，都会创建一个新的临时变量count，然后创建一个子闭包函数实例，
        2. 该实例的拥有指向该临时变量的引用，对其他子闭包函数实例不可见
        3. 所以每个闭包实例之间互不影响
*/ 
function makeCounter() {
    let count = 0;
    return function() {
        return count++;
    };
}

let counter = makeCounter();
let counter2 = makeCounter();

counter(); // 0
counter(); // 1

counter2(); // 0
counter2(); // 1

/*
    闭包实例的互相影响样例
        1. count是一个全局变量，每个闭包实例创建时都拥有指向该变量的引用
        2. 这些闭包实例访问的都是同一个变量，所以相互影响
*/
let count = 0;
function makeCounter() {
    return function() {
        return count++;
    };
}

let counter = makeCounter();
let counter2 = makeCounter();

counter(); // 0
counter(); // 1

counter2(); // 0
counter2(); // 1




// 闭包的应用
function sum(x) {
    if(this.res === undefined){
        this.res = 0;
    }

    if(arguments.length == 2){
        let tmp = this.res + arguments[0] + arguments[1];
        this.res = undefined;
        return tmp;
    }else if(arguments.length == 1){
        this.res += x;
        // return sum.bind(this);   //严格来说，this需要绑定
        return sum;     // 如果是作为一个单独的函数调用，this指向window，不需要bind；其他情况下需要绑定
    }
}

sum.__proto__.valueOf = function(){
    return globalThis.res;
};

sum(1)(2)(3,4); // 10
sum(1)(2).valueOf();



/*
    
    错误使用案例，在循环中使用闭包
        因为var变量可以跨块使用，所以
            for (var i = 0; i < 3; i++){}   等价于 var i = 0; for (i; i < 3; i++){}
        
        在外部作用域中，i的最终值为3，此时每个回调函数的语法调用链
            {}  =>  {} => {var i = 3}       
            本身 => for{} => print{}
    
    解决方案
        1. 使用let定义item
        2. 再套一层
    
        for(let i = 0; i < 10; i++)
            callback(i);
        
        等价于
        
        let j = 0
        for(j; i < 10; i++)
            let i = j;
            callback(i);

        while/if 也一样
        因为let无法跨块使用，所以for循环每次都是为callback()创建一个单独的i，位于其直接外部词法环境中声明的
*/

function print_1() {
    for (var i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }
}

print_1();    // 3, 3, 3

/*
    因此let无法跨块使用，所以每个回调函数对应的let i都是唯一的
    {}  =>  {let i = 1/2/3 } => {}
*/

function print_2() {
    for (let i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }
}

print_2();    // 1, 2, 3

/*
    我们手动将let i提高到print{}的词法环境
    {}  =>  {} => {let i = 3 }
*/
function print_3() {
    let i;
    for (i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }
}

print_2();   // 3, 3, 3








/*
    ES6新特性
        1. let 块级作用域   解构赋值    Symbol
        2. 

        1. Class
        2. Module
        3. Promise
        4. Map、Set




*/ 










