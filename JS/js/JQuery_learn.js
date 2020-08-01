/*
    JQuery
        1. JS库，对JS原生代码进行封装，简化编程
        2. JQuery将所有功能都封装到一个全局变量jQuery中，也可以用$表示
            window.jQuery === jQuery === $
        3. JQuery的所有方法都返回一个JQuery变量，类似于element数组，拥有0~多个元素，不会是null

    JQuery链式调用
        1. 通过在对象上的方法最后加上return this，把对象再返回回来，对象就可以继续调用方法，实现链式操作
            Obj().init().setFlag();
            Obj.prototype = {  
                init: function() {  
                    ...  
                    return this;  
                },  
                setFlag: function() {  
                    ...  
                    return this;  
                }  
            }  

*/ 

/*
    DOM操作
        1. DOM查询操作  $(selector)
            1.1 类似于document.QuerySelectorAll()
            1.2 JQuery对象与DOM对象的转换
                let div = $('#abc');    jQuery对象
                let divDom = div.get(0);    假设存在div，获取第1个DOM元素
                let another = $(divDom);    重新把DOM包装为jQuery对象
            1.3 JQuery对象可以进一步进行查询过滤，返回的也是JQuery对象
                find(selector)      查询子元素
                parent([selector])  查询父元素
                next([selector])  prev([selector])  查询后/前面的同级元素
                first()、last()和slice(i, j)

                filter([selector/func])     按照某个选择器/函数对子元素进行筛选
                map(func)   对子元素进行某个映射操作
            1.4 JQuery对象包含一组元素(0~多个)，对整个JQuery对象执行的操作会应用到每个元素上，没有元素也不会报错
                jq.text('js');

        2. DOM修改操作
            2.1 获取和修改节点文本内容
                获取 : text()  文本    html() 原始html文本，保留特殊符号、标签、属性等
                修改 : text(string)  html(string)
            2.2 查询和修改CSS样式
                var div = $('#test-div');
                div.css('color');   查询
                div.css('color', '#336699');    修改

                div.hasClass('highlight');      class是否包含highlight
                div.addClass('highlight');      添加highlight这个class
                div.removeClass('highlight');   删除

                隐藏和显示元素
                div.css('display', 'none');     div.css('display', 'block');    div.css('display', 'inline'); 
                div.hide()      div.show()      // 不需要记住原来是block还是inline

                div.width();    div.height();   div.width(400);     div.height('200px');
            2.3 查询和修改节点属性 attr()   removeAttr()
                div.attr('data');   // undefined, 属性不存在
                div.attr('name');   // 'Test'
                div.attr('name', 'Hello'); // div的name属性变为'Hello'
                div.removeAttr('name'); // 删除name属性
            2.4 表单元素的查询和赋值 val()
                各种类型的表单元素都使用val()进行内容查询和赋值
        3. DOM添加删除操作
            2.1 子元素添加
                append()    添加到最后    prepend()   添加到最前面
                支持多种添加子元素方式
            2.2 同级元素添加
                after()     before()
            2.3 删除JQuery对象
                remove()    JQuery对象包含的所有子元素都会一起删除


*/ 


let ul = $('ul.lang');
let dy = ul.find('.dy');


let langs = $('ul.lang li'); // 拿到JavaScript, Python, Swift, Scheme和Haskell

let lis = langs.filter(function () {
    return this.innerHTML.indexOf('S') === 0; // 返回S开头的节点
}); 

let contentArr2 = langs.map(function () {
    return this.innerHTML;
}).get();   // 用get()将JQuery对象转为Array对象 : ['JavaScript', 'Python', 'Swift', 'Scheme', 'Haskell']


console.log($('ul.lang').text());
console.log($('ul.lang').html());


// 所有表单元素都使用val()进行查询和赋值
let input = $('#test-input');
let select = $('#test-select');
let textarea = $('#test-textarea');

input.val(); // ''
input.val('abc@example.com'); // 文本框的内容已变为abc@example.com

select.val(); // 'BJ'
select.val('SH'); // 选择框已变为Shanghai

textarea.val(); // 'Hello'
textarea.val('Hi'); 


// 添加html代码
ul.append('<li><span>Haskell</span></li>');

let ps = document.createElement('li');
ps.innerHTML = '<span>Pascal</span>';
// 添加DOM对象:
ul.append(ps);

// 添加jQuery对象:
ul.append($('#scheme'));

// 添加函数对象:
ul.append(function (index) {
    return '<li><span>Language - ' + index + '</span></li>';
});


/*
    DOM事件绑定
        1. 事件绑定方法，绑定的多个方法会依次执行
            jq.on('eventName', func);
            jq.event(func);
        2. 取消绑定
            jq.off('eventName', func)
            jq.off('eventName')     取消eventName上的所有事件
            jq.off()                取消jq对象上的所有事件
        3. 常见事件
            3.1 鼠标事件
                click : 鼠标单击
                dblclick : 鼠标双击
                mouseenter : 鼠标进入
                mouseleave : 鼠标移出
                mousemove : 鼠标在DOM内部移动
                hover : mouseenter + mouseleave
            3.2 键盘事件
                keydown     keyup   keypress
            3.3 其他事件
                focus : 获得焦点
                blur : 失去焦点
                change : 当<input>、<select>或<textarea>的内容改变时触发
                submit : 当<form>提交时触发
                ready : 当页面被载入并且DOM树完成初始化后触发

                $(document).ready(func); === $(func);
        4. 代码触发事件
            jq.trigger('eventName')   ===  jq.event()
            事件是绑定在用户行为上，一般代码修改是不会触发相应事件，需要调用特殊代码触发事件

*/ 

var a = $('#test-link');
a.on('click', function () {
    alert('Hello!');
});

a.click(function () {
    alert('Hello!');
});

$(function () {
    // 监听事件有的会传参数 Event
    $('#testMouseMoveDiv').mousemove(function (e) {
        $('#testMouseMoveSpan').text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
    });
});


var input = $('#test-input');
input.change(function () {
    console.log('changed...');
});
input.val('change it!');    // 代码里修改是不会触发事件的
input.change();     // 触发change事件
input.trigger('change');    // 触发change事件


/*
    JQuery提供了一些简单的动画函数对DOM元素进行修改
    1. 动态隐藏
        参数 : 'slow'、'fast'、ms
        右下角到左上角 : jq.hide()   jq.show()   jq.toggle()
        下到上 : jq.slideUp()    jq.slideDown()      jq.slideToggle()
        淡出 : jq.fadeIn()   jq.fadeOut()    jq.fadeToggle()
    2. 自定义
        jq.animate(css, time[, func])
        css : 动画结束时元素的CSS格式
        time : 动画绘制时间，ms
        func : 动画绘制结束后执行的函数

*/ 

/*
    AJAX
    1. 格式 : $.ajax(url, settings)
    2. 常用设置
        async : 是否异步执行AJAX请求，默认为true
        method : 'GET'(默认) 'POST' 'PUT'等
        contentType : 发送POST请求的格式
            'application/x-www-form-urlencoded; charset=UTF-8'，
            'text/plain'    'application/json' 
            
            'multipart/form-data' : 
                1. JQuery的ajax不支持该格式
                2. 需要将contentType和processData字段都设为false，才能发送该类型的数据(FormData)
        processData : 默认为true，将数据序列化成字符串
        data : 
            发送的数据，可以是字符串、数组或object。
            如果是GET请求，data将被转换成query附加到URL上
            如果是POST请求，根据contentType把data序列化成合适的格式
        headers : 发送的额外的HTTP头，必须是一个object；
        dataType : 接收的数据格式，'html'、'xml'、'json'、'text'
    3. $.ajax()返回的是一个Promise对象，类似于XHR，也可以进行链式回调
*/ 

var jqxhr = $.ajax('/api/categories', {
    dataType: 'json'
}).done(function (data) {
    ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
}).fail(function (xhr, status) {
    ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
}).always(function () {
    ajaxLog('请求完成: 无论成功或失败都会调用');
});

// 发送 multipart/form-data 格式数据
$.ajax(url, {
	type: 'post',
	cache: false,
	contentType: false,
	processData: false, 
	data: fromData, 
});





//url: string,  method: string,  data?: object,  timeout?: number,  success: function,  error: function
function ajax1(args){
    
    let settings = {
        cache: false,
        type : args.method,
        success : args.success,
        error : args.error,
        // contentType : args.contentType,
    }

    if(args.data){
        settings.data = args.data;
    }
    if(args.timeout){
        settings.timeout = args.timeout;
    }

    $.ajax(args.url, settings);
}

function ajax2(args){
    
    let xhr = new XMLHttpRequest();
    xhr.open(args.method, args.url);
    xhr.onload = args.success;
    xhr.onerror = args.error;

    
    if(args.timeout){
        xhr.timeout = args.timeout;
    }

    if(args.data){
        xhr.send(args.data);
    }else{
        xhr.send();
    }
}