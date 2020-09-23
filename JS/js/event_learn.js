/*
    事件流
        1. 捕获阶段
            事件从顶层元素(window)一直传递到目标元素的父元素
        2. 目标阶段
            事件传递给目标元素
        3. 冒泡阶段
            事件从目标元素父元素向上逐级传递直到最顶层元素
    
    注意点：
        1. 默认情况下，事件在目标阶段触发，执行回调函数，然后沿着冒泡链向上传播，触发各个父元素
        2. 设置useCapture=true时
            事件会沿着捕获链依次触发，直到目标元素
        3. 调用 stopPropagation() 可以将事件停留在目标元素上，不再冒泡

*/ 


/*
    事件监听
        1. 侦听事件发生的结构称为事件监听器（Event Listener），响应事件触发而运行的代码块被称为事件处理器（Event Handler）
        2. addEventListener(event, function[, useCapture])  为某个元素添加监听事件
            event : 事件类型，字符串，不带 "on"
                "click"     点击事件
            function : 事件处理器函数名
            useCapture : 事件是否在捕获阶段触发，默认为false
        3. removeEventListener(event, function[, useCapture])   删除某个元素的指定监听事件
            event和function都是必须参数

    常用事件
        onclick
        ondblclick  双击
        onfocus/onblur  聚焦/解除焦点
        onmouseover/onmouseout  鼠标移到上面/移开

        oninput     文本框值发生任何变化时触发
        onchange    文本框发生变化，失去焦点后触发
        onpropertychange    同oninput，但是可以监听js代码导致的变化


    addEventListener() 和 .onevent的区别
        1. on只能用于内建事件，不能用于自定义事件
        2. on只能绑定一个回调函数
        
            只要functionB被绑定到myElement.onclick上，functionA被覆盖
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


/*
    事件触发的两种方式
        1. 自定义Event事件，将其绑定到元素上进行触发
            1. 创建Event对象    event = new Event(type[, options]);
            2. 绑定与触发       elem.dispatchEvent(event)
        2. 使用JQuery的triggerHandler()和trigger()触发


    Event
        event = new Event(type[, options]);
            type : 事件名称，可以是已有的内建事件名
            options : {
                    bubbles: false,         // 是否冒泡
                    cancelable: false       // 是否允许取消默认行为，设为true时event.preventDefault()才会生效
                }
    CustomEvent
        1. 用于创建自定义事件
        2. event = new CustomEvent(type, customEventInit);
            type : 自定义事件名称
            customEventInit : {
                detail : {}             // 事件的自定义属性，事件触发时可以
                bubbles: false,         // 是否冒泡
                cancelable: false       // 是否取消默认行为
            }
*/ 

elem = document.querySelector("#id");
elem.addEventListener("hello", function(event) {
    alert(event.detail.name);
});

elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "John" }
}));