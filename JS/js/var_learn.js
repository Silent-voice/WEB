/*
    变量与数据类型

    const : 常量，不易改变的值

    let/var : 
        1. 变量，JS中变量可以是任何支持的数据类型
        2. 未用let/var声明的变量会自动声明为全局变量
        3. let更规范，不允许声明两个相同名称的变量；var可以
            var myName = 'Chris';
            var myName = 'Bob';

            let myName = 'Chris';
            let myName = 'Bob';     报错
        4. 基本数据类型：
            Number
                1. JS中所有的数值都是Number，64位浮点数
                2. 特殊值
                    NaN：Not a Number，无法计算
                    Infinity : 无限大，超出范围
                let x1 = 17; let x2 = 34.00;  let x3 = 1.2345e3;
            
            String、
                let dolphinGoodbye = 'So';
            
            Boolean
                let iAmAlive = true;    let test = 6 < 3;
                判断语句中，null、undefined、0、NaN、''都视为false，其他视为true

            Array
                let myNumberArray = [10,15,40];
                let myNumberArray = new Array(10,15,40);


            Object
                对象的键值必须是字符串
                let dog = { name : 'Spot', breed : 'Dalmatian' };       
                dog.name        dog['name']

            typeof varName;    返回数据类型，结果是一个字符串
                Array 的typeof返回值也是object

            undefined   未定义
                任何变量都可以通过设置 let varName = undefined; 进行清空
                数据类型也是undefined

            null    空值
                用于清空对象，let person = null;  
                数据类型为object

            
            RegExp  正则表达式对象

*/

/*
    运算符
        1. == 和 ===
            == : 比较前会对数据进行类型转换，使比较的两个数类型相同，然后再比较值是否相同
            === : 先比较数据类型是否相同，相同时再比较值是否相同

            NaN === NaN;    // false，NaN无法比较
            1 / 3 === (1 - 2 / 3);  // false，浮点数计算误差
            Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001;      // true

*/


/*
    字符串操作
        1. 字符串本身不可变，只能访问，操作方法也是返回新的字符串
*/

'\x41' == 'A';
'\u4e2d\u6587' == '中文';

let browserType = 'mozilla';
console.log(browserType.length);

browserType[0];
// browserType[0] = 'e';    错误，无法修改某个字符

// 子串开始下标查找，没有返回-1
browserType.indexOf('zilla');

// 提取子串  [begin, end)   slice()  substring()    区别在于slice()支持负数下标，类似python
console.log(browserType.slice(0,3));
browserType.slice(2);   // [2,-1]



browserType = browserType.toLowerCase();
browserType = browserType.toUpperCase();
console.log(browserType);
browserType = browserType.replace('moz','van');


/*
    JSON  
        1. 字符串必须得用双引号
        2. 对于一个对象，可以自定义toJSON方法，调用stringify就会对指定结构的JSON数据进行序列化
*/
var myJSON = { "name" : "Chris", "age" : "38" };
var myString = JSON.stringify(myJSON);      // json -> string
var newJson = JSON.parse(myString);         // string -> json


/*
    数组操作
*/

let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
let random = ['tree', 795, [0, 1, 2]];

// 数组大小可以改变，多出来的元素填充undefined
let arr = [1, 2, 3];
arr[5] = 'x';   // [1, 2, 3, undefined, 5]
arr.length = 7  // [1, 2, 3, undefined, 5, undefined, undefined]


shopping[0] = 'tahini';

let sequence = [1, 1, 2, 3, 5, 8, 13];
for (let i = 0; i < sequence.length; i++) {
    console.log(sequence[i]);
}

//indexOf()     查询元素首次出现下标，没有返回-1
sequence.indexOf(2);


let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let myArray = myData.split(',');    
let myNewString = myArray.join(',');    
myArray.toString();     // 分隔符为 ,

// concat() 数组拼接
let newArray = sequence.concat([23,51]);


console.log(myArray);
// 尾部添加新元素，返回数组新长度
let newLength = myArray.push('Bristol');
console.log(myArray);
// 删除最后一个元素，返回删除元素
let removedItem = myArray.pop();
console.log(myArray);

// 首部添加新元素
myArray.unshift('Edinburgh');
console.log(myArray);
// 首部删除元素
myArray.shift();
console.log(myArray);



// splice(begin_index, n)   从下标begin_index开始，删除n个元素，返回被删除元素组成的数组
myArray.splice(1, 1)

delete myArray[0];      // 此时 myArray[0] = undefined，数据没了，位置还在


// 排序
sequence.sort()     //会修改数组本身

sequence.reverse()  // 反转数组






/*
    对象
*/

// this : 当前代码运行的对象

var person1 = {
    name : 'Chris',
    greeting: function() {
        console.log('Hi! I\'m ' + this.name + '.');
    }
}

var person2 = {
    name : 'Chris',

    child : {
        name : 'Chris_child',
        greeting: function() {
            console.log('Hi! I\'m ' + this.name + '.');
        }
    }
}
person1.greeting();
person2.child.greeting();

// 删除字段
delete person1.name     // 删除不在对象中元素不会报错

/*  
    判断字段是否存在
    in : 在对象或对象原型链的父类中
    object.hasOwnProperty() : 对象自身拥有的属性

*/ 

if('toString' in person2){
    console.log(person2.hasOwnProperty('toString'));
}





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

// 借助Object()创建对象
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
    Map()   Set()   ES6标准新增
*/
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.set('Adam', 67);
m.has('Adam');
m.get('Adam');
m.delete('Adam');
m.get('Adam');  // undefined

var s = new Set([1, 2, 3, 3, '3']);     // 重复元素自动被过滤
s.add(4);
s.delete(3);

/*
    iterable类型：Array Map Set
        使用 for ... of ... 遍历
*/ 

var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}

/*
    for ... in ...
        用于遍历一个对象的所有属性
        Array也是一个对象，所以可以遍历
*/




/*
    正则表达式

*/

// 两种写法
let re1 = /ABC\-001/;
let re2 = new RegExp('ABC\\-001');

// 匹配 ^ 表示开头   $表示结尾
let re = /^\d{3}\-\d{3,8}$/;
re.test('010-12345'); // true
re.test('010-1234x'); // false