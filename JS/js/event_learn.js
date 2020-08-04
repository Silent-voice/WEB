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

        oninput     文本框值发生任何变化时触发
        onchange    文本框发生变化，失去焦点后触发
        onpropertychange    同oninput，但是可以监听js代码导致的变化


    addEventListener() 和 .onevent的区别
        
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