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
            DOMContentLoaded : 文档加载结束
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
    Array特有的一些函数
        map() : 调用指定函数对数组每个元素进行处理
        reduce() : 把上次计算结果传给下次计算
        filter() : 筛选，返回true的留下
        sort() : 排序
        every() : 判断数组的所有元素是否满足测试条件
        find() : 查找符合条件的第一个元素，没有返回undefined
        findIndex() : 查找符合条件的第一个元素的下标，没有返回-1
        forEach() : 类似map()，但不返回
*/

function pow(x) {
    return x * x;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let results = arr.map(pow);     // [1, 4, 9, ...]

results = arr.reduce(function (x, y) {
    return x + y;
});

results = arr.filter(function (x) {
    return x % 2 !== 0;
});     //[1,3,5,7,9]





/*
    事件监听
        1. 侦听事件发生的结构称为事件监听器（Event Listener），响应事件触发而运行的代码块被称为事件处理器（Event Handler）
        2. addEventListener(event, function[, useCapture])  为某个元素添加监听事件
            event : 事件类型，字符串，不带 "on"
                "click"     点击事件
            function : 事件处理器函数名
        3. removeEventListener(event, function[, useCapture])   删除某个元素的指定监听事件
            event和function都是必须参数

    常用事件
        onclick
        ondblclick  双击
        onfocus/onblur  聚焦/解除焦点
        onmouseover/onmouseout  鼠标移到上面/移开


    addEventListener() 和 .event的区别
        
        只有functionB被绑定到myElement.onclick上，functionA被覆盖
        myElement.onclick = functionA;
        myElement.onclick = functionB;
        
        两种方法都绑定到了myElement.onclick，触发时都会执行
        myElement.addEventListener('click', functionA);
        myElement.addEventListener('click', functionB);


    事件冒泡执行顺序：
        1. 当一个行为同时触发了子元素的事件以及其父元素的事件时，执行顺序为：当前元素事件 -> 父元素事件 -> ... -> html事件
        2. 在这个事件执行链中，事件对象依旧是原始的那个元素对象

        child.onclick = function(e) {
            e.stopPropagation();        // 不再沿着冒泡链触发事件
            video.play();
        };


    stopPropagation()
        当不想让事件沿着冒泡链继续触发时，可以使用stopPropagation()停止在当前元素


    事件委托：借助事件冒泡原理实现
        当一个父元素有众多子元素，这些子元素的监听事件相同时
        可以将事件绑定在父元素上，而无需绑定每个子元素

*/ 





/*
    事件处理函数有参数时，指向事件对象
*/

function bgChange(e) {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    e.target.style.backgroundColor = rndCol;
    console.log(e);
}  

btn.addEventListener('click', bgChange);


