/*
DOM : Document Object Model，文档对象模型，主要负责对HTML文档进行访问控制
BOM : Browser Object Model，浏览器对象模型，主要负责对浏览器进行访问控制

    BOM
        1. window对象
            1.1 window对象表示浏览器窗口
            1.2 JS中所有的全局对象、函数、变量都是window对象的成员，成为其属性和方法
            1.3 常见window子对象
                1.3.1 document : HTML文档的访问控制
                1.3.2 frames : 使用<iframe></iframe>在页面中插入其他网页时使用的操控对象
                1.3.3 history : 浏览器访问过的URL信息
                1.3.4 location : 当前页面的URL信息
                1.3.5 navigator : 浏览器的信息
                1.3.6 screen : 客户端显示屏幕的信息
            1.4 常用属性和方法
                window.innerHeight  window.innerWidth   window.document

                window.alert(message)   弹出警示框
                window.open([URL,name,specs,replace])   打开一个新窗口，返回新窗口对象
                window.close()      关闭窗口
                window.moveTo(x,y)      将窗口左上角移动到坐标(x,y)处
                window.resizeTo(width,height)   调整窗口大小
                window.prompt([msg,defaultText])   弹出一个供用户进行输入的对话框，返回用户输入字符串
        2. navigator对象
            2.1 浏览器信息，可自行修改，不具有确定性
            2.2 常用属性和方法
                appCodeName 浏览器的代码名  appName 浏览器的名称    appVersion 浏览器的平台和版本信息
                cookieEnabled 是否启用cookie      platform 操作系统平台
                userAgent 请求中user-agent 头部的值
                navigator.javaEnabled()     浏览器是否启用java
        
        3. screen对象
            3.1 客户端显示屏幕的信息
            3.2 常用属性和方法
                height  width   availHeight   availWidth
                colorDepth	pixelDepth

        4. history对象
            4.1 用户在浏览器窗口中访问过的URL信息
            4.2 常用属性和方法
                length  历史列表中的网址数
                back()  加载history列表中的前一个 URL
                forward()	加载history列表中的下一个 URL
                go(number|URL)	加载history列表中的某个具体页面     go(-1) = back()  go(1) = forward()

        5. location对象
            5.1 当前页面的URL信息，也能进行重定向
            5.2 常用属性和方法
                href 完整的URL      host 主机名+端口    hostname 主机名     port 端口       protocol URL协议(http/https)
                pathname URL路径部分     search URL中的数据查询部分
                assign(URL) 载入一个新的文档
                reload([forceGet]) 重新载入当前文档，forceGet是否绕开缓存重新加载
                replace(URL) 用新文档替代当前文档，与assign()区别在于没法回退

*/ 