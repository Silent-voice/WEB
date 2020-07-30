/*
    原型链
        1. JS中没有类的概念，每个对象都有一个原型链；每个对象都有原型对象，每个对象也都能当作其他对象的原型对象。
        2. 基本概念
            构造函数 : 指定构造对象应该具有的属性和方法
            函数原型对象 : 每个构造函数都对应着一个函数原型对象，该原型对象拥有构造函数指定的属性和方法
            实例原型对象 : 使用构造函数创建的对象实例

            原型对象 : 函数原型对象 + 实例原型对象

            prototype : 构造函数的一个属性，指向一个函数原型对象
            constructor : 函数原型对象的一个属性，指向一个构造函数
            __proto__ : 原型对象的一个属性，指向原型链上父原型对象，默认情况下是其构造函数的函数原型对象；浏览器内部属性，不可用于编程
        3. 样例介绍
            一个构造函数 F
            该构造函数的原型对象 F_P
            使用构造函数F创建的对象实例F_O_1，F_O_2

            F.prototype = F_P
            F_P.constructor = F

            F_O_1.__proto__ = F.prototype = F_P
            F_O_2.__proto__ = F.prototype = F_P

            F_P.__proto__ = Object_P
            Object_P.__proto__ = null

        4. 可以通过修改一个构造函数的prototype，改变实例原型对象.__proto__的指向
            function F1(){}
            function F2(){}
            F2.prototype = new F1();
            let f2 = new F2();

            f2.__proto__ = F2.prototype = new F1()
            new F1().__proto__= F1.prototype = F1_P
            F1_P.__proto__ = Object_P

        5. 原型链的最顶端是Object构造函数的函数原型对象Object.prototype，再往上Object.prototype.__proto__ = null
        6. JS对象属性的搜索过程：
            6.1 首先查看是否是对象自己的属性和方法
            6.2 其次查看对象.__proto__，也就是对象的父原型有没有
            6.3 依次在原型链中查询，直到Object对象



*/ 

// 构造函数的prototype指向一个原型对象，可以自由修改

function Animal(name) {
    this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

// 对象本身没有color属性，所以去原型链上查找
cat1.color // 'white'
cat2.color // 'white'

// 现在对象cat1拥有color属性了，所以不会去原型链上查找
cat1.color = 'black';

cat1.color // 'black'
cat2.color // 'white'



//  修改构造函数的原型对象时，一般要同时修改原型对象constructor属性的指向



/*
    instanceof
        1. 返回一个布尔值，表示对象是否为某个构造函数的实例
        2. instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上
        3. 等价于 prototype.isPrototypeOf() 函数
*/ 

var obj = { foo: 123 };
obj instanceof Object; // true

Object.prototype.isPrototypeOf(obj);

null instanceof Object; // false，instanceof对null、undefined失效


// 可用于判断值的类型
var d = new Date();
d instanceof Date // true
d instanceof Object // true






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
Child.prototype.constructor = Child;

var c = new Child('child');
console.log(c.name);


// 多重继承
function M1() {
    this.hello = 'hello';
}
function M2() {
    this.world = 'world';
}

function S() {
    M1.call(this);
    M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);
// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'