/*
    变量与数据类型

    const : 常量，不易改变的值

    let/var : 变量，JS中变量可以是任何支持的数据类型
        1. let更规范，不允许声明两个相同名称的变量；var可以
            var myName = 'Chris';
            var myName = 'Bob';

            let myName = 'Chris';
            let myName = 'Bob';     报错
        2. 基本数据类型：
            Number、String、Boolean、Array
                let myAge = 17; let x1 = 34.00;         JS Number是64位浮点数
                let dolphinGoodbye = 'So';
                let iAmAlive = true;    let test = 6 < 3;
                let myNumberArray = [10,15,40];
            Object
                let dog = { name : 'Spot', breed : 'Dalmatian' };       
                dog.name        dog['name']

            typeof varName;    返回数据类型，结果是一个字符串
                Array 的typeof返回值也是object

            undefined
                任何变量都可以通过设置 let varName = undefined; 进行清空
                数据类型也是undefined

            null
                用于清空对象，let person = null;  
                数据类型为object

*/

/*
    运算符
        1. == 和 ===
            == : 比较前会对数据进行类型转换，使比较的两个数类型相同，然后再比较值是否相同
            === : 先比较数据类型是否相同，相同时再比较值是否相同

*/


/*
    字符串操作
*/

let browserType = 'mozilla';
console.log(browserType.length);

browserType[0];
// browserType[0] = 'e';    错误，无法修改某个字符

// 子串开始下标查找，没有返回-1
browserType.indexOf('zilla');

// 提取子串  [begin, end)
console.log(browserType.slice(0,3));
browserType.slice(2);   // [2,-1]



browserType = browserType.toLowerCase();
browserType = browserType.toUpperCase();
console.log(browserType);
browserType = browserType.replace('moz','van');


//JSON
var myJSON = { "name" : "Chris", "age" : "38" };
var myString = JSON.stringify(myJSON);      // json -> string
var newJson = JSON.parse(myString);         // string -> json


/*
    数组操作
*/

let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
let random = ['tree', 795, [0, 1, 2]];


shopping[0] = 'tahini';

let sequence = [1, 1, 2, 3, 5, 8, 13];
for (let i = 0; i < sequence.length; i++) {
    console.log(sequence[i]);
}



let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let myArray = myData.split(',');
let myNewString = myArray.join(',');
myArray.toString();     // 分隔符为 ,


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



// splice(begin_index, n)   从下标begin_index开始，删除n个元素
myArray.splice(1, 1)

delete myArray[0];      // 此时 myArray[0] = undefined，数据没了，位置还在



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


