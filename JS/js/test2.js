function fn(){
    console.log(this.name);
}

let obj = {name : "hhh"};

// 通过Function.prototype添加一个新方法call_()
// Function.prototype.call_ = function (obj) {
//     obj.fn = this;      // 将fn绑定到obj的属性上，这里this指向fn()
//     obj.fn();           // 执行fn
//     delete obj.fn;      //删除新加属性，防止一直绑定
// };

// fn.call_(obj); 



obj.fn = fn;
obj.fn();