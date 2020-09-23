/*
    Cookie
        1. 浏览器端存储于 document.cookie 对象上,是一个字符串， 以 ; 分隔 key=value
        2. cookie的属性，数据和属性都是以分号;分隔
            name=value	键值对，可以设置要保存的 Key/Value 数据

            domain	域名，默认是当前域名    ;domain=domain
            maxAge	最大失效时间(毫秒)
            secure	当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
            Path	表示 cookie 影响到的路径。如果路径不能匹配时，浏览器则不发送这个Cookie
            Expires	过期时间(秒)，在设置的某个时间点后该 Cookie 就会失效，如 expires=Money, 05-Dec-11 11:11:11 GMT
            httpOnly	如果在COOKIE中设置了httpOnly属性，则通过程序(JS脚本)将无法读取到COOKIE信息


    Session
        1. 服务器端使用的一种记录客户端状态的机制，保存在服务器上
        2. 相当于用户档案

*/ 


/*
    web storage
        1. 用于存储和检索较小的、由名称和相应值组成的key/value数据项，都是String
        2. 概念
            2.1 origin
                源/域，协议+域名+端口 确定一个源
            2.2 Storage
                具体的数据存储接口，提供了对 特定origin 下数据存储和管理功能，两个不同的网址对应不同的Storage
                属性：Storage.length      数据个数
                方法：Storage.getItem()   Storage.setItem()   Storage.removeItem()    Storage.clear()
            2.3 sessionStorage
                1. 提供了对 特定origin 下的session Storage对象的访问功能
                2. session Storage对象是临时的，浏览器关闭时数据就会丢失
                3. 即使是同一个页面，不同的浏览器窗口也没法共享session Storage
            2.4 localStorage
                1. 与sessionStorage类似，不过local Storage对象具有持久性，浏览器关闭数据依旧存在
                2. 在所有同源窗口中都是共享的
        3. storage发生变化，会触发window对象的 storage 事件
        


*/


/*
    Storage与Cookie的区别
        1. cookie是在http请求中携带，在客户端和服务器之间来回传输；
            storage存储在本地
        2. 数据大小不同，cookie不能超过4k
        3. 数据有效期不同
            cookie失效前都有效；sessionStorage某个窗口存活期间；localStorage长时间有效
        4. 数据作用域不同
            cookie同源下所有页面；sessionStorage单一页面；localStorage同源下所有页面

*/ 


sessionStorage.setItem('myCat', 'Tom');
sessionStorage.getItem("autosave");     // 不存在返回null


/*
    IndexedDB
        1. 用于存储负责和较大数据，可以在浏览器中访问的一个完整的数据库系统
        2. 数据库操作是异步的，避免了阻塞等待
        3. 几种对象类型
            3.1 IDBOpenDBRequest
                3.1.1 连接数据库的结果存储对象
                3.1.2 监听事件
                    onerror     连接失败
                    onsuccess   连接成功
                    onupgradeneeded     数据库不存在或者指定版本号高于已有版本号，创建新数据库
            3.2 IDBDatabase
                3.2.1 数据库连接对象
                3.2.2 常用方法
                    IDBDatabase.close()     关闭连接
                    IDBDatabase.createObjectStore(name[, options])     创建一个新表(ObjectStore)，返回表对象
                    IDBDatabase.transaction(name)
                    IDBDatabase.transaction(storeNames[, mode])
                        创建一个的事务管理对象(IDBTransaction)，能够以指定的模式对多个表进行操作
                        storeNames : 一个表名数组或单一表名
                        mode : READ_ONLY    READ_WRITE      VERSION_CHANGE
                3.2.3 监听事件
                    abort   有事务发生了回滚
                    close   error   versionchange
            3.3 IDBTransaction
                3.3.1 事务管理对象
                3.3.2 常用属性和方法
                    IDBTransaction.db 数据库名   IDBTransaction.mode 操作模式    IDBTransaction.objectStoreNames 作用域下的表名列表
                    
                    IDBTransaction.objectStore(name)    获取表对象
                    IDBTransaction.abort()      操作回滚
                    IDBTransaction.commit()     提交任务
                3.3.3 监听事件
                    abort   回滚    
                    complete    操作完成
                    error
            3.4 IDBObjectStore
                3.4.1 表对象
                3.4.2 常用属性和方法
                    IDBObjectStore.name 表名    IDBObjectStore.indexNames 索引字段名    IDBObjectStore.keyPath  默认索引，唯一标识字段名
                    IDBObjectStore.transaction  所属事务对象

                    add()   delete()    get()   put()   // 查询修改时key是默认索引字段，value是整条记录
                    count()     clear()
                    createIndex()   deleteIndex()
                    index()     返回一个指定索引对象IDBIndex
            3.5 IDBIndex
                3.5.1 一个表的索引对象，可以使用该索引指定字段的值进行数据查询
                3.5.2 IDBObjectStore默认情况下使用keyPath指定的字段作为查询索引

        4. 基本操作流程
            4.1 连接数据库
                request = window.indexedDB.open(db_name[, db_version]);
                    db_version : 无符号整数，默认为1
                    返回一个IDBOpenDBRequest对象，存储着连接结果
            4.2 绑定不同连接结果的处理事件
            4.3 获取数据库对象
                request.result
                e.target.result     e是传给事件处理函数的参数
            4.4 创建表
                objectStore = db.createObjectStore('db_name', { keyPath: 'id', autoIncrement:true });
                    keyPath : 默认索引字段
                    autoIncrement : 索引自增
            4.5 获取事务，获取表

            4.6 表操作


*/ 

window.onload = function() {

    // 与数据库建立连接
    let request = window.indexedDB.open('notes', 1);

    // 连接失败
    request.onerror = function() {
        console.log('Database failed to open');
    };
    // 连接成功
    request.onsuccess = function() {
        console.log('Database opened successfully');
        db = request.result;
        displayData();
    };

    // 
    request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });

        objectStore.createIndex('title', 'title', { unique: false });

        console.log('Database setup complete');
    };

}