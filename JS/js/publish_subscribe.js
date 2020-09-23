/*
    发布订阅模式
        1. 订阅者向事件中心订阅指定事件，并指定回调函数
        2. 发布者向事件中心发布事件，事件中心执行所有相关回调函数
    
    简单情况下，可以将发布者作为事件中心，接收订阅

*/ 

/*
    定义发布者/事件中心对象
*/ 
function Deliver() {
    this.subscriber_list = [];  // 订阅者的回调函数列表，默认只有一种事件可以订阅
    // this.subscriber_list_map = new Map();    // 多个订阅序列，每个序列订阅不同事件
}


Deliver.prototype = {
    constructor: Deliver,
    // 发布函数
    deliver: function(message) {
        this.subscriber_list.forEach(function(fn){
            fn(message);
        });
        return this;
    }
}


//订阅事件，传入一个订阅回调函数和指定发布者
function subscribe(subscriber, deliver) {
    // 判断发布者中是否已经有了该订阅回调函数
    let hasExists = deliver.subscribers.some(function(fn){return fn === subscriber});
    if(!hasExists) {
        deliver.subscribers.push(subscriber);
    }
}


//退订subscriber事件
function unSubscribe(subscriber, deliver) {

    // 去除订阅回调函数subscriber
    deliver.subscribers = deliver.subscribers.filter(function(fn){
        return fn !== subscriber;
    });
}

