/*
    http常见属性和方法
        http.createServer([options,] requestListener)
            requestListener : 请求监听处理函数


    ClientRequest常见属性和方法

    ServerResponse常见属性和方法        Writable Stream
        response.writeHead()
        response.write()
        response.end()


    Server常见属性和方法
        server.listen()
*/ 


let http = require('http'),
    fs = require('fs'),
    url = require('url'),       // 用于解析url
    path = require('path');     // 用于路径管理


let root = path.resolve(process.argv[2] || '.');    // 当前路径
console.log('Static root dir: ' + root);

// 创建http server，并传入回调函数:
let server1 = http.createServer(function (request, response) {

    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);



    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server1.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');



let server2 = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;

    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);

    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server2.listen(8081);