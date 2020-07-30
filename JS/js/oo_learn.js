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
            return非对象时，依旧返回this对象
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
        1. 指向一个对象，属性或方法 "当前" 所在对象
            作为构造函数时，函数内部的this指向创建的实例化对象；作为普通函数时，函数内部的this指向外部父对象(window)
        2. this的本质是用于指明当前代码的运行环境，也就是在内存中运行时，是由哪个对象调用的
        3. 不建议使用嵌套this
            函数A内执行的函数B中的this，一般指向B所属对象
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

a.b.m() // undefined，this指向a.b对象

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

o.f1()


var o = {
    f1: function() {
        console.log(this);  // 指向o对象

        var that = this;
        var f2 = function() {
            console.log(that);  // 指向o对象
        }();
    }
}

o.f1()


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
            将func的this绑定到obj对象上，后面参数是func调用所需参数
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
d.getTime()     

var print = d.getTime;
print()     // 出错，因为getTime()中调用的this对象从d变为了window

var print = d.getTime.bind(d);  //将getTime()中的this绑定到d上
print()     // 正确




/*
    ES6新特性：Class
        1. Class是构造函数的另一种写法，属性、类型都和构造函数相同
        2. constructor()
            类构造函数，和以前的构造函数用法一样，没有return就是返回实例化对象本身

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
    1. 子类的本质是创建一个父类实例对象，然后向父类实例对象中添加新的属性和方法
    2. 所以子类构造函数中this的使用必须在super()之后，等待构造父类实例对象

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