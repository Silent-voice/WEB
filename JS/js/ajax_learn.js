/*
    XMLHttpRequest(XHR)
        1. 继承于EventTarget，用于与服务器进行交互。
        2. XMLHttpRequest对象常用属性
            responseType    响应数据类型
            response    响应主体(数据部分)，responseType格式
            responseText    字符串化的响应主体

            status  响应状态码      statusText  响应状态具体内容
    
            readyState  请求状态    UNSENT(0)   OPENED(1)   HEADERS_RECEIVED(2)     LOADING(3)  DONE(4)
            timeout     超时时间
        3. 常用方法
            3.1 XMLHttpRequest()    
                初始化实例对象
                let xhrReq = new XMLHttpRequest();
            3.2 xhrReq.open(method, url[, async, user, password])  
                初始化一个请求，会清空该xhrReq对象之前的所有请求和响应信息
                method : GET、POST、PUT、DELETE
                async : 默认为true，是否异步处理，决定请求send()之后是否阻塞
                user、password : 用于用户认证
            3.3 xhrReq.setRequestHeader(header, value);
                设置请求头字段，多次设置相同的字段，其值会合并
            3.4 xhrReq.send(body);
                发送请求，请求由请求行、请求头部、请求数据组成
                body可以是多种类型的数据，包括ArrayBuffer、Document、String、Blob等，没有数据默认为null
            3.5 xhrReq.abort() 
                终止请求
            3.6 xhrReq.getAllResponseHeaders()
                获取整个相应头部字段的原始字符串   key: value\r\nkey: value\r\n
            3.7 xhrReq.getResponseHeader(header)
                获取指定的响应头部字段的字符串值，没有返回null
        4. 常用相关事件
            onabort
            onerror 请求错误
            onload  请求正常完成
            ontimeout   请求超时
            onloadend   请求结束，不管是abort、load或是error


*/ 


let verseChoose = document.querySelector('select');
let poemDisplay = document.querySelector('pre');

verseChoose.onchange = function() {
    let verse = verseChoose.value;
    updateDisplay_fetch(verse);
};

function updateDisplay_xhr(verse) {
    verse = verse.replace(" ", "");
    verse = verse.toLowerCase();
    let url = './../medias/' + verse + '.txt';

    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'text';

    request.onload = function() {
        poemDisplay.textContent = request.response;
    };

    request.send();
};



/*
    Fetch
        1. 配合Promise使用，提供了对请求的简单封装，让代码更易读
        2. fetch(url[, init])
            init : 配置对象，可以配置请求具体的参数
            返回值：promise对象

*/


function updateDisplay_fetch(verse) {
    verse = verse.replace(" ", "");
    verse = verse.toLowerCase();
    var url = './../medias/' + verse + '.txt';

    // get
    fetch(url)
    .then(function(response) { return response.text(); })
    .then(function(text) { poemDisplay.textContent = text; });
};


let data = {answer: 42};
fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
})
.then(response => response.json())

// 使用Request对象
const myRequest = new Request('http://localhost/api', {method: 'POST', body: '{"foo":"bar"}'});
fetch(myRequest)
.then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Something went wrong on api server!');
    }
})
.catch(error => {
    console.error(error);
});



updateDisplay_fetch('Verse 1');
verseChoose.value = 'Verse 1';







