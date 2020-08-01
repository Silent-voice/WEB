/*
    表单提交的几种数据格式
        1. GET  数据放在请求行的URL中
            1. 以?分隔网址和数据，以&分隔键值对
            2. 数据部分全部转换成了URL编码，编码工作可以使用JS的escape()函数
            3. 样式：网站?key1=value1&key2=value2
                https://www.example.com?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.

        2. POST 数据放在请求体(body)中
            2.1 application/x-www-form-urlencoded(默认格式)
                2.1.1 数据格式与GET相似，以&分隔键值对，全部转换成URL编码
                    foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A

            2.2 text/plain
                2.2.1 纯文本方式，不做特殊处理
                    foo=bar
                    baz=The first line.
                    The second line.

            2.3 multipart/form-data     传文件时使用
                2.3.1 表单中每一项都由三部分组成，格式如下
                    多个属性字段
                    内容字段
                    分隔符
                2.3.2 常见属性字段
                    Content-Disposition: form-data(固定的第一个属性)
                    name    表单项名称
                    Content-Type    表单项数据内容，如img/gif
                    filename    文件名
                2.3.3 内容字段可以是原始的文本数据，也可以是文件的二进制码

                    头部字段，确定数据格式multipart/form-data和分隔符
                    Content-Type: multipart/form-data; boundary=---------------------------314911788813839

                    -----------------------------314911788813839
                    Content-Disposition: form-data; name="foo"

                    bar
                    -----------------------------314911788813839
                    Content-Disposition: form-data; name="baz"

                    The first line.
                    The second line.

                    -----------------------------314911788813839
            2.4 application/json form支不支持？

    FormData
        1. 表单对象     键值对存储数据
            var formdata = new FormData();      //空表单
            var formdata = new FormData(form_dom);
        2. 键名默认是表单元素的name属性，可以存储多对键名相同的 键值对
        3. 常用方法
            get(key)    获取第一个匹配到的键值
            getAll(key) 返回一个数组，获取所有匹配到的键值
            set(key, value)    append(key, value)    delete(key)    has(key)
            keys()      values()    entries()
            checkValidity()     // 触发表单定义的字段校验
        
        
        4. FormData提交时会将数据转换成multipart/form-data格式
            即使修改Request Header中的Content-type字段为其他类型，数据依旧是multipart/form-data格式，不会自动转换







*/ 

window.onload = function(){
    let form = document.querySelector('#form_1');
    let bt = document.querySelector('#bt_1');


    bt.onclick = sendData;


    function sendData(){
        event.preventDefault();     // 取消当前元素的默认行为


        let xhr = new XMLHttpRequest();

        // 自动初始化，有name的字段都会生成一个key/value对
        let fd = new FormData(form);
        // 手动添加字段
        fd.append("key1", "value1");

        xhr.onload = function(event){
            alert(event.target.responseText);
        };

        xhr.onerror = function(event){
            alert('哎呀！出了一些问题。');
        };


        xhr.open("POST", "https://example.com/cors.php");
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.send(fd);

    }


}