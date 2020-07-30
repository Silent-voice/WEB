/*
    Error对象
        1. 属性
            message : 错误提示信息
            name : 错误名称（非标准属性）
            stack : 错误的堆栈（非标准属性）
        2. 派生错误对象
            SyntaxError : 解析代码时发生的语法错误
            ReferenceError : 引用一个不存在的变量时发生的错误
            RangeError : 一个值超出有效范围时发生的错误
            TypeError : 对象是变量或参数不是预期类型时发生的错误
            URIError : 对象是 URI 相关函数的参数不正确时抛出的错误
            EvalError : 函数没有被正确执行

*/ 


var err = new Error('出错了');
err.message

// 自定义异常
function UserError(message) {
    this.message = message || '默认信息';
    this.name = 'UserError';
}

// 修改原型链指向，从而拥有原生Error的相关属性和方法
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;


// 主动抛出异常
throw new UserError('出错了！');


function f() {
    try {
        console.log(0);
        throw 'bug';
    } catch(e) {
        console.log(1);
        return true;    // 这句原本会延迟到 finally 代码块结束再执行
    } finally {
        console.log(3);
        return false;   // 这句会覆盖掉前面那句 return

    }
    console.log(5); // 不会运行
}