/*
    测试异步函数是否是在主线程中执行
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
    console.log(message);
})
.catch(e => {
    console.log('Error: ' + e);
});

function sleep(d){
    for(var t = Date.now();Date.now() - t <= d;);
}

for(let i = 0; i < 10; i ++){
    console.log(i);
    sleep(1000);
}


