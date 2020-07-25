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

*/
function myFunction() {
    alert('hello');
}


// 匿名函数，没有定义函数名
// 像普通函数一样调用 myGreeting()
var myGreeting = function() {
    alert('hello');
}

var myButton = document.querySelector('button');
myButton.onclick = function() {
    alert('hello');
}


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

    stopPropagation()
        当不想让事件沿着冒泡链继续触发时，可以使用stopPropagation()停止在当前元素


    事件委托：借助事件冒泡原理实现
        当一个父元素有众多子元素，这些子元素的监听事件相同时
        可以将事件绑定在父元素上，而无需绑定每个子元素

*/ 


child.onclick = function(e) {
    e.stopPropagation();        // 不再沿着冒泡链触发事件
    video.play();
};


/*
    事件处理函数有参数时，指向事件对象
*/

function bgChange(e) {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    e.target.style.backgroundColor = rndCol;
    console.log(e);
}  

btn.addEventListener('click', bgChange);

