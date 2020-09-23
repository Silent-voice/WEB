/*
    模块化规范
        CommonJS : 同步，用于服务端，被依赖模块同步加载
        ADM : 异步，用于浏览器端，被依赖模块异步加载
        CMD : 异步，与AMD类似，写法不同

*/ 

/*
    CommonJS
        1. 主要用于Node服务端，每一个文件就是一个模块
        2. 原理
            1. CommonJS将每个模块都封装成了一个Module对象，该对象有几个主要属性
                id : 模块的唯一识别符，通常是模块的绝对路径
                exports : 模块暴露出的属性和方法的对象集合
                children : 一个数组，模块引用的其他模块的Module对象
            
            2. 模块内部通过module.exports添加和修改自己暴露出的对象集合
            3. 所有模块也都可以通过require(path)方法获取到指定模块Module对象，将其添加到当前模块的children中，
                同时返回引用模块的exports属性
        3. require(path)
            1. 读取一个js文件，返回返回该模块的exports对象
            2. 第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。
                即同一次运行时，多个模块加载的都是一个exports对象，他们之间会相互影响
*/ 

// 模块定义 myModule.js
var name = 'Byron';
function printName(){
    console.log(name);
}
function printFullName(firstName){
    console.log(firstName + name);
}
module.exports = {
    name : name,
    printName: printName,
    printFullName: printFullName
};

// 模块引用
var helloModule = require('./myModule.js');
console.log(helloModule.name);
helloModule.printName();


/*
    模块间的相互影响
*/ 
// test3
let name = 'test3';
let d = {
    name : 'test3'
};
module.exports = {
    name : name,
    d : d
};

//test2
let t3_module = require('./test3');

function f(){
    console.log(t3_module.name);
    console.log(t3_module.d.name);
    t3_module.name = 'test2';
    t3_module.d.name = 'test2';
}
module.exports = {
    f : f
};
// test1
let t3_module = require('./test3')

console.log(t3_module.name);        // test3
console.log(t3_module.d.name);      // test3
t3_module.name = 'test1';
t3_module.d.name = 'test1';


let t1_module = require('./test2')
t1_module.f();                      // test1    test1 

console.log(t3_module.name);        // test2
console.log(t3_module.d.name);      // test2



/*
    AMD
        1. 类似于事件绑定的做法，为加载模块的语句绑定回调函数，模块异步加载完成时调用回调函数，使用被加载模块
        2. 模块定义
            define([require_modules, ] callback([args]){... return {key1 : value2, ...};});
                require_modules : 
                    1. 可选字段，如果一个模块的定义依赖其他模块，就使用一个数组表示所依赖的模块
                    2. 并将加载好的模块传给后面的callback函数
                    3. callback函数返回的就是该模块暴露出的对象
                    4. 该模块的模块名默认就是文件名

                define(['myLib'], function(myLib){
                　　　　function foo(){
                　　　　　　myLib.doSomething();
                　　　　}
                　　　　return {
                　　　　　　foo : foo
                　　　　};
                　});
        3. 模块引用
            require(modules, callback);
                modules : 数组，引用的模块列表
                callback : 引用模块加载结束后执行的方法

            require(['math'], function (math){
        　　　　alert(math.add(1,1));
        　　});

*/ 

/*
    ES6标准下的模块化
        1. 模块加载是在编译阶段进行，可以进行静态优化

        2. export
            1. export导出的是一个接口，唯一指向本模块内的一个变量
            2. export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
        3. import
            1. 在编译阶段，import生成一个只读引用；在真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
            2. 因此是与模块内的原始值动态绑定。
            3. 因为import引入的是一个只读引用(符号连接)，所以引入变量不能赋值；如果引入的变量是对象，可以修改其属性，不过不建议这样做。


    注意：
        1. 浏览器中通过<script type="module">加载js文件后，会创建模块作用域运行js代码，而不是在全局作用域内运行。
            1. 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
            2. 因此this关键字是undefined，而不是window
            3. 模块脚本自动采用严格模式
        2. 模块加载默认是延迟模式 defer 


*/ 


/*
    export
        1. 可以多次export，但不能放在块内(无法确定是否执行，就无法静态优化)
        2. 默认export的变量名就是调用时指定的属性名称
        3. 不能直接export变量，必须加上 {} 或者 export整条声明语句
        4. export的输出与其原始值是动态绑定的，通过该接口，可以取到模块内部实时的值
        5. 导出方式有两种：命名导出、默认导出
            命名导出：
                导出已定义的变量 export{a,b,c}
                导出整条声明语句 
            默认导出：export default


*/

// profile.js
export var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

// export lastName;     错误
export {lastName, year };

function v1() {  }
function v2() {  }

// 重命名
export {
    v1 as streamV1,
    v2 as streamV2,
};


/*
    import 
        1. 不能放在块内
        2. 自定义导入的变量，不一定要全导入
        3. 同一个模块如果import多次，将只解析一次，然后将引入的对象传递给所有import
            不仅局限于一个模块，多个模块import同一个模块也只会被加载解析一次

*/ 

import { firstName, lastName as surname, year } from './profile.js';

// 整体加载，将所有导入变量放入对象circle中，不允许修改
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));


/*
    export default : 
        1. 为模块指定默认输出，一个模块只能定义一次
        2. import时可以用任意名称指向该默认输出，不需要{}
        3. export default本质上是输出一个叫做default的变量或方法，不能跟赋值语句
*/
// export-default.js
export default function () {
    console.log('foo');
}

import customName from './export-default';
customName(); // 'foo'


var a = 1;
export default a;   // 正确
// export default var a = 1;   // 错误



// 导出类接口
export default class {}

import MyClass from 'MyClass';
let o = new MyClass();



// 模块重定向
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

export * from 'my_module';      // 相当于继承了 "my_module" 模块，不包括export default导出的接口


/*
    区别：
        1. CommonJS/AMD 是运行时加载，生成对象；ES6是编译时加载，加载语句不能放在块中，所以无法实现动态加载
        2. CommonJS模块输出的是一个值的拷贝，输出之后模块内部变化不会影响已输出的值；如果输出的是一个对象引用的拷贝，模块内外还是会相互影响。
            ES6模块输出的是值的引用，输出与其原始值是动态绑定的


*/ 