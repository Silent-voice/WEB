/*
    异步编程
        1. JS默认是单线程运行，容易出现阻塞
        2. 常见的异步编程方法
            2.1 使用Web Workers将一些代码交给一些worker进程执行，主进程可以继续响应用户操作
                2.1.1 Web Workers无法访问DOM对象，也就无法渲染UI
            2.2 使用回调函数，绑定在事件上的回调函数只有在事件触发时才会异步执行
            2.3 使用promise创建异步函数链
        3. 在异步函数执行时，主线程可以继续响应用户操作；异步函数执行结束后，主线程需要去处理异步函数的执行结果


    理解：
        1. 浏览器主线程拥有一个类似任务池的东西，一开始的代码就是一个任务，放在任务池首部运行
        2. 主线程运行过程中调用的异步函数由子线程运行，运行结束后的处理代码作为一个新的任务，放到主线程的任务池中
        3. 主线程按照任务池中的排列顺序依次执行各任务

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
        1. promise 是一个对象，它代表了一个异步操作的最终完成或者失败后返回的结果，
        2. 由于不确定该异步操作什么时候完成，所以promise一开始处于一种既不成功也不失败的中间状态pending
        3. promise可以理解为一个函数返回的对象，可以绑定回调函数，不需要再将回调函数作为参数传进去
        4. 在异步操作结束之后(成功或者失败)，绑定在promise上的回调函数会依次执行
        5. 绑定在promise上的回调函数构成一个promise链，链上的回调函数都是等待前一个函数执行结束后再异步执行当前函数
        6. promise的状态
            pending : 正在运行
            resolved : 运行结束
                fullfilled : 运行成功，返回运行结果
                rejected : 运行失败，返回一条错误信息

    then(callback(arg))        then(arg => callback(arg))
        1. 为一个promise对象绑定回调函数，返回一个新的promise对象
        2. 类似于事件监听，当promise完成时触发，但只会触发一次
        3. 当前then中callback的返回值会作为下个then中callback的参数
    
    catch(callback(arg))    等价于 then(null => callback(arg))
        1. 当抛出异常时，浏览器会在promise链上寻找下一个catch()执行回调函数
        2. 也返回一个新的promise对象，后面可以继续promise链

    finally(callback())
        1. 不管前面的promise是fullfilled还是rejected都会执行，所以回调函数没有参数
        2. 返回值依然是一个promise，promise的内容将沿用上一个promise

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
})
.finally(() => {
    console.log(`fetch attempt finished.`);
});


/*
    Promise.all(iterable)
        1. 同时响应多个promise，所有promise都fullfilled时才会fullfilled，否则会rejected
        2. 多个promise的结果组合成一个数组，按照参数中promise的顺序排列

*/

// 返回一个promise
function fetchAndDecode(url, type) {
    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            if(type === 'blob') {
                return response.blob();
            } else if(type === 'text') {
                return response.text();
            }
        }
    })
    .catch(e => {
        console.log(`There has been a problem with your fetch operation for resource "${url}": ` + e.message);
    });
}


let coffee = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let description = fetchAndDecode('description.txt', 'text');

// 传入3个promise
Promise.all([coffee, tea, description]).then(values => {
    console.log(values);

    // 结果依次排列
    let objectURL1 = URL.createObjectURL(values[0]);
    let objectURL2 = URL.createObjectURL(values[1]);
    let descText = values[2];

    // Display the images in <img> elements
    let image1 = document.createElement('img');
    let image2 = document.createElement('img');
    image1.src = objectURL1;
    image2.src = objectURL2;
    document.body.appendChild(image1);
    document.body.appendChild(image2);

    // Display the text in a paragraph
    let para = document.createElement('p');
    para.textContent = descText;
    document.body.appendChild(para);
});


/*
    自定义promise
        new Promise( function(resolve, reject) {...})
*/ 

function timeoutPromise(message, interval) {
    // 自定义promise
    return new Promise((resolve, reject) => {
        if (message === '' || typeof message !== 'string') {    
            reject('Message is empty or not a string');     // 运行失败，返回错误信息
        } else if (interval < 0 || typeof interval !== 'number') {
            reject('Interval is negative or not a number');
        } else {
            setTimeout(function(){
                resolve(message);       // 正常结束，返回message
            }, interval);
        }
    });

};

timeoutPromise('hello', 2000)
.then((message) => {
    alert(message);
})
.catch(e => {
    console.log('Error: ' + e);
});


function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
        request.onsuccess = function() {
            resolve(request.result);
        };
    
        request.onerror = function() {
            reject(request.error);
        };
    });
}


/*
    async
        1. 用于函数声明部分，将函数变为异步函数，将返回值转换成一个promise
    await
        1. 用于异步函数内部，放在其他异步函数之前，将代码停止在改行，直到promise完成
        2. await关键字使JavaScript运行时暂停于此行，允许其他代码在此期间执行，直到异步函数调用返回其结果

*/

async function myFetch() {
    let response = await fetch('coffee.jpg');
    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}

// 使用try{}catch(){} ，依旧可能会触发promise链中的catch()块
async function myFetch2() {
    try {
        let response = await fetch('coffee.jpg');
        let myBlob = await response.blob();

        let objectURL = URL.createObjectURL(myBlob);
        let image = document.createElement('img');
        image.src = objectURL;
        document.body.appendChild(image);
    } catch(e) {
        console.log(e);
    }
}

myFetch()
.catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
});

// async/await 与所有promise功能兼容

let values = await Promise.all([coffee, tea, description]);

/*
    await阻塞改进
        1. 将promise对象存储与变量中，可以通过await同时启动多个异步函数，而不需要阻塞等待一个个执行
*/
async function timeTest() {
    const timeoutPromise1 = timeoutPromise('hello',3000);
    const timeoutPromise2 = timeoutPromise('hello',3000);
    const timeoutPromise3 = timeoutPromise('hello',3000);

    // 三个异步函数同时启动，3s左右运行结束
    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}




/*
    定时函数 : 定时函数中的回调函数依旧由主线程执行，但是会在其他主线程代码执行完之后才会执行
        1. setTimeout(callback[, delay, arg1, arg2, ...])   定时器到期后执行一个函数或指定的一段代码
            1.1 callback : 待执行函数
            1.2 delay : 延迟执行时间，单位ms，默认为0
            1.3 arg1, arg2, ... : 函数所需参数
            1.4 返回值：定时器编号，timeoutID，正整数
        2. setInterval(callback, delay[, arg1, arg2, ...])  间隔一段时间，重复执行一个函数或指定的一段代码
            2.1 参数和返回值与setTimeout相同
            2.2 setInterval()和setTimeout()共用一个ID池
            2.3 间隔时间是从回调函数开始执行算起
        3. requestAnimationFrame(callback)
            3.1 专门用于动画绘制，告诉浏览器下次重绘动画前执行回调函数，更新动画参数
            3.2 不需要指定时间间隔，一般是以60fps的帧率刷新。当浏览器隐藏时，会自动暂停动画绘制，节约资源
            3.3 会自动传给回调函数一个DOMHighResTimeStamp参数(ms)，指明回调函数被调用时间
            3.4 返回值是一个long ID
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


const element = document.getElementById('xxx'); 
let start;
function step(timestamp) {
    if (start === undefined)
        start = timestamp;
    const elapsed = timestamp - start;

    element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

    if (elapsed < 2000) { 
        requestAnimationFrame(step);
    }
}

let rAF = requestAnimationFrame(step);
cancelAnimationFrame(rAF);
