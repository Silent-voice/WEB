
let fs = require('fs');

/*
    异步读取文件
        1. 发送错误时data=undefined
        2. 不加文件编码读取的是二进制文件，返回一个Buffer对象
*/ 
fs.readFile('./hello.js', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// 同步读文件，错误需要try{}catch(){}捕捉
try {
    let data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}

/*  
    异步写文件
        1. 文件编码由传入数据的格式决定
            String -> utf8      Buffer -> 二进制
*/ 

data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

// 同步写文件
fs.writeFileSync('output.txt', data);


// 输入流
let rs = fs.createReadStream('sample.txt', 'utf-8');

// 数据分多个chunk
rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});
// 数据读取结束
rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

// 输出流
let ws = fs.createWriteStream('output1.txt', 'utf-8');
ws.write('使用Stream写入文本数据...\n');
ws.write('END.');
ws.end();

// pipe 将两个流串起来
rs = fs.createReadStream('sample.txt');
ws = fs.createWriteStream('copied.txt');

// 相当于文件拷贝，rs end时ws关闭
rs.pipe(ws);