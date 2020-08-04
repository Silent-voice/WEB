/*
    new
        1. 执行构造函数，返回实例化对象
        2. 没有new，执行构造函数就相当于执行普通函数，不返回实例化对象
        3. new原理
            1. 创建一个空对象obj
            2. obj.__proto__指向构造函数的原型对象prototype
            3. 将obj赋给函数内的this
            4. 执行构造函数代码
        4. 构造函数默认返回this对象，
            如果有return一个对象语句时，就返回return的对象
            如果return非对象时，依旧返回this对象
        5. 构造函数(使用new调用)内，new.target指向构造函数本身
            function f() {
                console.log(new.target === f);
            }

*/ 


// 一般函数创建对象
function createNewPerson(name) {
    var obj = {};
    obj.name = name;
    obj.greeting = function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
    return obj;
}

let person3 = createNewPerson('ttt');

// 构造函数创建对象
function Person_constructor(name) {
    this.name = name;
    this.greeting = function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
}
let person4 = new Person_constructor('ttt');


// 通过类创建对象
class Person {
    // 构造方法
    constructor(name) {
        this.name = name;
        this.greeting = function () {
            console.log('Hi! I\'m ' + this.name + '.');
        };
    }
}

let person5 = new Person('ttt');

// 借助Object()创建对象，可以不用构造函数
let person6 = new Object({
    name : 'Chris',
    age : 38,
    greeting : function() {
        console.log('Hi! I\'m ' + this.name + '.');
    }
});

// 通过create()拷贝对象
let person7 = Object.create(person6);




/*
    this
        1. 指向调用 该代码所在函数 的对象
            没有显示的对象调用该函数时，this指向window，严格模式下this是undefined
        2. this的本质是用于指明当前代码的运行环境，也就是在内存中运行时，是由哪个对象调用的
        3. 不建议使用嵌套this
*/ 


function f() {
    return '姓名：'+ this.name;     // this指向name所在对象，根据情况是可变的
}

var A = {
    name: '张三',
    describe: f
};

var B = {
    name: '李四',
    describe: f
};

A.describe() // "姓名：张三"
B.describe() // "姓名：李四"


var a = {
    p: 'Hello',
    b: {
        m: function() {
            console.log(this.p);
        }
    }
};

a.b.m(); // undefined，this指向a.b对象

var hello = a.b.m;      

hello(); // undefined，this指向window，没有p属性




var o = {
    f1: function () {
        console.log(this);  // 指向o对象

        var f2 = function () {
            console.log(this);  // 指向window对象
        }();
    }
}

o.f1();


var o = {
    f1: function() {
        console.log(this);  // 指向o对象

        var that = this;
        var f2 = function() {
            console.log(that);  // 指向o对象
        }();
    }
}

o.f1();


//函数B内执行的函数A中的this，一般指向A所属对象
A = {
    name : 'A',
    fun : function(){
        console.log(this.name);
    }

}

B= {
    name : 'B',
    fun : function(){
        console.log(this.name);
        A.fun();
    }

}
B.fun();    // 'B' 'A'





/*
    this绑定方法
        1. func.call(obj, arg1, arg2, ...)
            1. 将func的this绑定到obj对象上，后面参数是func调用所需参数
            2. 只是这次运行时this改变了，以后运行还是原来的this
        2. func.apply(obj, [arg1, arg2, ...])
            与call()作用相同，就是参数传递使用的是数组


        3. func.bind(obj, arg1, arg2, ...)
            1. 将函数体内的this绑定到obj对象上
            2. 将函数体内的其他参数也绑定到相应的arg1, arg2, ...上

            3. 每次运行都会产生一个新的匿名函数，所以不能直接用于监听事件上
                element.addEventListener('click', func.bind(obj));  // 错误，这会导致监听事件无法删除

                // 正确
                var listener = func.bind(obj);
                element.addEventListener('click', listener);
*/

var n = 123;
var obj = { n: 456 };

function a() {
    console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456



var d = new Date();
d.getTime();     

var print = d.getTime;
print();     // 出错，因为getTime()中调用的this对象从d变为了window

var print = d.getTime.bind(d);  //将getTime()中的this绑定到d上
print();     // 正确




/*
    ES6新特性：Class
        1. Class是构造函数的另一种写法，属性、类型都和构造函数相同
        2. constructor()
            类构造函数，和以前的构造函数用法一样，没有return就是返回实例化对象本身
        3. 
            constructor()中使用this和static定义的属性是类的属性
            而Class内部定义的其他函数，则作为  Class.prototype 的属性

*/


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

typeof Point // "function"
Point === Point.prototype.constructor // true

var p = new Point(1,2);
p.toString();

/*
    继承：extends
        1. 进行以下三步操作
            super()     //调用父类的构造方法，super()=FatherClass.constructor.call(this)
            ChildClass.__poroto__ = FatherClass
            ChildClass.prototype.__poroto__ = FatherClass.prototype
        2. 所以子类能够继承父类的正常属性和静态属性

*/
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);        // 调用父类的构造函数，必须
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}





/*
    自行实现关键字
*/

/*
    替代new的做法
*/ 
function f(){
    this.name = 'asd';
    this.greet = function(){
        console.log(this.name);
    };

}

let f_o_1 = new f();    // 使用new

// 不用new
let f_o_2 = {};     // 创建空对象
f.call(f_o_2);      //将this绑定到f_o_2上  
f_o_2.__proto__ = f.prototype   // 修改原型链



/*
    继承
        1. 先调用父类构造函数
        2. 修改子类构造函数的prototype
        3. 修改子类构造函数的prototype的constructor

    Object.assign(target, source)
        将source对象中自身拥有的所有属性赋值给target对象，键名相同会进行覆盖

*/

function Father(value){
    this.name = value;
}

function Child(value) {
    Father.call(this, value);
    this.prop = value;
}


// 克隆一个prototype对象，防止修改constructor影响到父类
Child.prototype = Object.create(Father.prototype);
Child.prototype.__proto__ = Father.prototype;
Child.prototype.constructor = Child;


var c = new Child('child');
console.log(c.name);



/*
    模拟实现fn.call(obj,args)方法
        思路：将fn作为obj的一个属性，这样调用obj.fn(args)时，this就指向obj

*/

function fn(arg1, arg2, arg3){
    console.log(this.name + arg1 + arg2 + arg3);
}

let obj = {name : "hhh"};

// 通过Function.prototype添加一个新方法call_()
Function.prototype.call_ = function (obj) {

    // 获取参数
    var args = [];
    // 注意i从1开始，第一个参数是obj
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }; 


    obj.fn = this;      // 将fn绑定到obj的属性上，这里this指向fn()
    // obj.fn();           
    eval("obj.fn(" + args + ")");   // 使用eval()执行fn，这样才能传进去多个参数，会自动对数组参数进行处理
    delete obj.fn;      //删除新加属性，防止一直绑定
};

fn.call_(obj, 1, 2, 3); 