/*
    变量与数据类型

    const : 常量，赋值后不可修改

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
                    NaN：Not a Number，无法计算，==和===不能进行比较，可用isNaN()判断
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
                1. 对象的键名(属性)必须是字符串或者Symbol，非字符串会被自动转换成字符串
                2. 对象的键值可以是任何类型的数据


                let dog = { name : 'Spot', breed : 'Dalmatian' };       
                dog.name        dog['name']

            undefined   未定义
                任何变量都可以通过设置 let varName = undefined; 进行清空
                数据类型也是undefined

            null    空值
                用于清空对象，let person = null;  
                typeof 为object，但不是一个对象类型的数据，只是对早期设计的兼容

            Symbol : ES6新增类型，表示唯一的数据
                1. 基本数据类型，格式：Symbol([description])
                    description : 对该数据的描述
                2. 每个Symbol都是唯一的
                    let id1 = Symbol("id");
                    let id2 = Symbol("id");
                    console.log((id1 == id2));  // false
                3. 常用作key值，防止被其他代码误操作
                4. 不会参与 for ... in ...的循环
                5. 会有一个全局Symbol注册表，使用Symbol的描述作为key存储各个Symbol数据，以便获取
                    Symbol.for(description);    // 从注册表中获取Symbol，没有就新创建一个

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


    
    in
        判断一个对象是否具有某个属性，不区分该属性是对象自身的属性，还是继承的属性
        继承的属性指使用 __proto__ 指明的继承
    
    for ... in ...
        同 in ，遍历所有可枚举属性
        遍历数组的话返回的是数组的下标

    for ... of ...
        遍历一个可迭代集合中的元素，包括Array Map Set

    Object.keys(obj)
        只返回自身的属性

    Object.prototype.hasOwnProperty.call(obj, field)
        判断field属性是否是obj对象自身属性


    变量存储于栈中，引用存储于堆中
    
    基本数据类型和对象(引用)类型的区别
        1. 对象类型拥有属性和方法，基本数据类型只是指向内存中的值
        2. 使用基本数据类型变量时，会用基本包装类Number()/String()/Boolean()进行包装，所以可以调用属性和方法
        3. 使用完该包装即被销毁

    
    var let const区别
        var : 不能跨函数访问、可以跨块访问、可重复声明
        let : 不能跨函数访问、不能跨块访问、不可重复声明
        const : 不能跨函数访问、不能跨块访问、不可重复声明
                声明时必须赋值、赋值之后不可修改
                不可修改指的是变量指向的内存值，如果该内存值是一个引用，可以修改其引用对象的内容

    

    深浅拷贝的区别
        浅拷贝：仅仅拷贝了引用，指向的内存值相同
        深拷贝：在内存中重新分配空间，重新生成引用

    浅拷贝：Object.assign(dest, [src1, src2, src3...])
        1. 将src对象中的属性拷贝到dset对象中，并返回新的对象；
        2. 如果属性名重复，后面拷贝的会覆盖掉前面的
        3. 如果原对象中属性也是个对象，只会拷贝该对象的引用，所以是浅拷贝
            
    深拷贝：JSON.parse(JSON.stringify(obj1))
        1. 先序列化再反序列化


        let user = {
            name: "John",
            sizes: {
                height: 182,
                width: 50
            }
        };

        let clone = Object.assign({}, user);
        console.log( user.sizes === clone.sizes );    // true

        let obj2 = JSON.parse(JSON.stringify(user));
        console.log( user.sizes === obj2.sizes );   // false

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
    深拷贝的实现
        1. 对Array和对象进行递归拷贝
        2. 对于Function对象，重新执行定义语句，不过name属性会不同，而且无法修改
        3. Function对象无法深拷贝，因为不能拷贝闭包引用
*/ 
function deepCopy(obj){
    let new_obj;
    if(obj instanceof Object){
        if(Array.isArray(obj)){
            new_obj = [];
            for(v of obj){
                new_obj.push(deepCopy(v));
            }
        }else if(obj instanceof Function){
            eval("new_obj = " + obj.toString());
            new_obj.name = obj.name;
        
        }else{
            new_obj = {};
            for(key of Object.keys(obj)){
                new_obj[key] = deepCopy(obj[key]);
            }
        }
    }else{
        new_obj = obj;
    }
    return new_obj;
}




/*
    运算符
        1. == 和 ===
            == : 比较前会对数据进行类型转换，使比较的两个数类型相同，然后再比较值是否相同
            === : 先比较数据类型是否相同，相同时再比较值是否相同

            NaN === NaN;    // false，NaN无法比较
            1 / 3 === (1 - 2 / 3);  // false，浮点数计算误差，小数比较有一定危险
            Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001;      // true
        2. 空值运算符 ??
            x = a ?? b
            等价于
            x = (a !== null && a !== undefined) ? a : b;

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
        indexOf()
        slice()     substring()
        replace()
        trim()  trimStart()     trimEnd()
*/

'\x41' == 'A';
'\u4e2d\u6587' == '中文';

'c'.charCodeAt();   // 字符转10进制数
String.fromCodePoint(97);   // 10进制数转字符

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


// 排序，会将数据转为字符串，然后是按照ASCII顺序排序
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
    实现reduce
*/ 
Array.prototype.newReduce = function(fn){
    if(this.length == 0){
        return fn(null, null);
    }else if(this.length == 1){
        return fn(this[0], null);
    }else{
        let cur_sum = this[0];
        for(let i = 1; i < this.length; i ++){
            cur_sum = fn(cur_sum, this[i]);
        }
        return cur_sum;
    }
    

}



/*
    对象
        Object.keys(obj);   查看对象自身的所有可枚举属性
        delete obj.p;       删除属性，只能删除自身属性，无法删除继承属性
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
    JSON
        1. JSON对象是一个值，可以是数组、对象、基本数据类型
        2. 数据格式要求
            1. 值不能是函数、正则表达式对象、日期对象
            2. 键名必须是字符串，字符串必须得用双引号
            3. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）
            4. 数组或对象最后一个成员的后面，不能加逗号
        3. 常用函数
            JSON.stringify()
                1. 将一个JSON值转换成一个JSON字符串
                2. 自定义对象的toJSON方法，调用stringify就会将toJSON()的返回值作为输入参数进行转换
            JSON.parse()
                1. 将一个JSON字符串转换成一个JSON值
*/ 
var myJSON = { "name" : "Chris", "age" : "38" };
var myString = JSON.stringify(myJSON);      // json -> string
var newJson = JSON.parse(myString);         // string -> json


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