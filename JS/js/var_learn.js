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
                    Infinity : 无限大，超出范围，有正负
                    0 : 无限小也会表示成0
                let x1 = 17; let x2 = 34.00;  let x3 = 1.2345e3;
            
            String
                1. 字符串本身不可变，只能访问，操作方法也是返回新的字符串
                    s[0] = 'e';     错误
                    delete s[0];    错误
                2. JS内部使用Unicode编码，每个字符占用16位(2字节)

                let dolphinGoodbye = 'So';
            
            Boolean
                let iAmAlive = true;    let test = 6 < 3;
                判断语句中，null、undefined、0、NaN、''都视为false，其他视为true

            Array
                let myNumberArray = [10,15,40];
                let myNumberArray = new Array(10,15,40);


            Object : 狭义的对象、数组、函数
                1. 对象的键名(属性)必须是字符串，非字符串会被自动转换成字符串
                2. 对象的键值可以是任何类型的数据


                let dog = { name : 'Spot', breed : 'Dalmatian' };       
                dog.name        dog['name']

            undefined   未定义
                任何变量都可以通过设置 let varName = undefined; 进行清空
                数据类型也是undefined

            null    空值
                用于清空对象，let person = null;  
                数据类型为object


    typeof v
        1. 返回一个变量的基本类型，字符串
            number、string、boolean、object、function、undefined
        2. 无法判断具体是哪种引用，因为引用对象返回的都是object

    obj instanceof fun
        1. 用于判断对象obj的原型链中是否有fun.prototype
        2. 等价于 prototype.isPrototypeOf() 函数

    Object.prototype.toString.call(v)
        1. 返回变量的数据类型，比typeof更加具体
            [object Null]   [object Number]   [object String]   [object Boolean]    [object Undefined]
            [object Function]   [object Array]   [object Date]   [object Object]    [object RegExp]


    基本数据类型和对象(引用)类型的区别
        1. 对象类型拥有属性和方法，基本数据类型只是指向内存中的值
        2. 使用基本数据类型变量时，会用基本包装类Number()/String()/Boolean()进行包装，所以可以调用属性和方法
        3. 使用完该包装即被销毁

    
    var let const区别
        var : 不能跨函数访问、可以跨块访问、可重复声明
        let : 不能跨函数访问、不能跨块访问、不可重复声明
        const : 不能跨函数访问、不能跨块访问、不可重复声明、声明时必须赋值、赋值之后不可修改





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
    运算符
        1. == 和 ===
            == : 比较前会对数据进行类型转换，使比较的两个数类型相同，然后再比较值是否相同
            === : 先比较数据类型是否相同，相同时再比较值是否相同

            NaN === NaN;    // false，NaN无法比较
            1 / 3 === (1 - 2 / 3);  // false，浮点数计算误差，小数比较有一定危险
            Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001;      // true

*/

/*
    数据类型转换
        1. 自动转换
            变量本身数据类型是不确定的，但运算符是有数据类型要求，会自动转换运算子的数据类型
        2. 强制转换
            Number()、String()、Boolean()

*/ 

/*
    常用函数
        parseInt(string[, radix])     
            radix : 进制  
            失败返回NaN
        parseFloat(string)
            失败返回NaN
            自动过滤前导空白符，遇到无法解析字符停止
        
        isNaN()     
            判断数值是否是NaN，不是数值会使用Number()转为数值再判断

*/

/*
    字符串
        
*/

'\x41' == 'A';
'\u4e2d\u6587' == '中文';

let browserType = 'mozilla';
console.log(browserType.length);

browserType[0];

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
    Array
        改变自身的函数
            push()  pop()   shift()     unshift()
            sort()  reverse()
            splice()

        不改变自身，返回新数组/数据的函数
            concat()    slice()
            map() ...

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



newArray = myArray.slice(0, 3);     //  提取子数组

// splice(begin_index, n)   从下标begin_index开始，删除n个元素，返回被删除元素组成的数组
myArray.splice(1, 1)

delete myArray[0];      // 此时 myArray[0] = undefined，数据没了，位置还在


// 排序
sequence.sort()     //会修改数组本身

sequence.reverse()  // 反转数组

/*
    Array特有的一些函数
        map() : 调用指定函数对数组每个元素进行处理
        reduce() : 把上次计算结果传给下次计算
        filter() : 筛选，返回true的留下
        sort() : 排序
        every() : 判断数组的所有元素是否满足测试条件
        find() : 查找符合条件的第一个元素，没有返回undefined
        findIndex() : 查找符合条件的第一个元素的下标，没有返回-1
        forEach() : 类似map()，但不返回
*/

function pow(x) {
    return x * x;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let results = arr.map(pow);     // [1, 4, 9, ...]

results = arr.reduce(function (x, y) {
    return x + y;
});

results = arr.filter(function (x) {
    return x % 2 !== 0;
});     //[1,3,5,7,9]





/*
    对象
        Object.keys(obj);   查看对象自身的所有可枚举属性
        delete obj.p;       删除属性，只能删除自身属性，无法删除继承属性

        for(key in obj)     遍历属性
*/


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
        一般直接创建的对象 {} 都继承与Object.prototype，而Object.prototype没有属性，只有方法
    object.hasOwnProperty() : 对象自身拥有的属性

*/ 

if('toString' in person2){
    console.log(person2.hasOwnProperty('toString'));
}



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
    in
        判断一个对象是否具有某个属性，不区分该属性是对象自身的属性，还是继承的属性
    for ... in ...
        循环中获得对象自身的属性
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