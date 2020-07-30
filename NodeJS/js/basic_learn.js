/*
    基本命令
        1. 运行
            node --use_strict xxx.js    // 严格模式




*/ 



/*
    CommonJS模块加载
        1. 每个文件就是一个模块
        2. 模块中可以使用module.exports暴露出可供调用的变量和函数
            module.exports = {
                key1 : value1,
                key2 : value2
            }
        3. 其他模块中可以通过 require('') 引用其他模块，使用模块暴露出来的变量和函数
        4. 不能解决异步加载问题，无法用于浏览器端

    理解：
        1. CommonJS会创建一个全局对象module
        2. 对于每个使用module.exports的模块，会创建一个相应的子对象，放入module.children([])字段中
        3. 子对象的id字段为模块文件的绝对路径，exports字段则是该模块暴露出可供调用的变量和函数组成的对象，即module.exports赋的值
        4. 其他模块通过require()调用时，会在module.children中查找相应id的子对象，然后返回该子对象的exports字段

*/

var helloModule = require('./hello');
console.log(helloModule.name);
helloModule.printName();


/*
    基本模块
        1. 在浏览器端，JS的全局对象是window；在服务器端，全局变量是global。基本模块都是global下的子对象
            global.console  global.process
        2. console 控制台对象，可以打印各种格式的日志
        3. process  进程控制对象
            3.1 JS本身运行是单线程的，Node也一样，Node不断执行响应事件的函数，直到没有任何响应事件的函数可以执行时，Node就退出了
            3.2 process可以展示进程信息
                process.version     process.arch    process.cwd() 当前工作目录      process.chdir() 切换工作目录
            3.3 可以绑定事件
                process.on('exit', func);   程序退出时相应事件
                process.nextTick(func);   下一次事件轮询时触发，Node会不断轮询，每次轮询将被触发事件的相应函数加入处理队列
        4. fs   文件读写模块
            4.1 需要预先加载    let fs = require('fs');
            4.2 提供了同步和异步两种方法
            4.3 常用方法
                fs.access(path[, mode], callback)   查看用户对文件(夹)的权限，包括文件是否存在功能
                fs.stat(path)   获取文件(夹)详细信息，返回一个stat对象
        5. http http请求处理模块
*/ 

