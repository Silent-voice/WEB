/*
    异步编程
        1. JS默认是单线程运行，容易出现阻塞
        2. 常见的异步编程方法
            2.1 使用Web Workers将一些代码交给一些worker进程执行，主进程可以继续响应用户操作
                2.1.1 Web Workers无法访问DOM对象，也就无法渲染UI
            2.2 使用回调函数，绑定在事件上的回调函数只有在事件触发时才会异步执行
            2.3 使用promise创建异步函数链


*/ 


/*
    callback 回调函数
        1. 回调函数大都是异步的，但也有非异步的，比如数组的 forEach(callback) 方法

*/

function loadAsset(url, type, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;

    // 请求正确执行之后被调用
    xhr.onload = function() {
        callback(xhr.response);
    };

    xhr.send();
}

function displayImage(blob) {
    let objectURL = URL.createObjectURL(blob);

    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}

loadAsset('./../medias/coffee.jpg', 'blob', displayImage);


/*
    Promises
        1. promise 是一个对象，它代表了一个异步操作的最终完成或者失败
        2. promise可以理解为一个函数返回的对象，可以绑定回调函数，不需要再将回调函数作为参数传进去
        3. 在异步操作结束之后(成功或者失败)，绑定在promise上的回调函数会依次执行
        4. 绑定在promise上的回调函数构成一个promise链，链上的回调函数都是等待前一个函数执行结束后再异步执行当前函数

    then(callback(arg))        then(arg => callback(arg))
        1. 为一个promise对象绑定回调函数
        2. 返回一个新的promise对象
        3. 当前then中callback的返回值会作为下个then中callback的参数
    
    catch(callback(arg))    等价于 then(null => callback(arg))
        1. 当抛出异常时，浏览器会在promise链上寻找下一个catch()执行回调函数
        2. 也返回一个新的promise对象，后面可以继续promise链

*/

// fetch HTTP请求的简写方法，返回一个promise对象
fetch('./../medias/products.json')
.then(function(response) {
    return response.json();
})
.then(function(json) {
    products = json;
    console.log(products);
})
.then(function(){
    console.log('here');
})
.catch(function(err) {
    console.log('Fetch problem: ' + err.message);
});




/*
    定时函数 : 定时函数中的回调函数依旧由主线程执行，但是会在其他主线程代码执行完之后才会执行
        1. setTimeout(func[, delay, arg1, arg2, ...])   定时器到期后执行一个函数或指定的一段代码
            function : 待执行函数
            delay : 延迟执行时间，单位ms，默认为0
            arg1, arg2, ... : 函数所需参数
            返回值：定时器编号，timeoutID，正整数
        2. setInterval(func, delay[, arg1, arg2, ...])  间隔一段时间，重复执行一个函数或指定的一段代码
            参数和返回值与setTimeout相同
            setInterval()和setTimeout()共用一个ID池
            间隔时间是从回调函数开始执行算起
*/

function sayHi(who) {
    alert('Hello ' + who + '!');
}

let timeoutID = setTimeout(sayHi, 2000, 'Mr. Universe');
clearTimeout(timeoutID);    // 清除定时器

function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById('demo').textContent = time;
}

let intervalID = setInterval(displayTime, 1000);
clearInterval(intervalID);