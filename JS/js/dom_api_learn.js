/*
    浏览器提供的3个常用对象
        1. Navigator
        2. Window
            窗口控制功能、本地数据访问功能
        3. Document
            页面操作功能

*/ 

/*
    数据类型
        1. EventTarget
            1.1 最基础的DOM接口对象，能够绑定监听事件
            1.2 常用属性和方法
                EventTarget.addEventListener()      EventTarget.removeEventListener()
        2. Node 
            2.1 继承于EventTarget接口
            2.2 各种类型的DOM API对象会继承于该接口，允许我们使用相似的方式对待这些不同类型的对象。
            2.3 常用属性和方法
                Node.childNodes     Node.firstChild     Node.lastChild
                Node.parentNode     Node.parentElement
                Node.nodeName   Node.nodeType   Node.nodeValue  Node.ownerDocument  Node.textContent

                Node.appendChild()    Node.cloneNode()    Node.contains()   Node.removeChild()
        3. NodeList
            3.1 node的集合
            3.2 NodeList有些情况下是动态实时更新的(Node.childNodes)，有的情况下是静态的()
        
        4. document
            4.1 继承于Node，表示浏览器载入的一个网页对象，也就是DOM树
            4.2 描述了任何类型的文档的通用属性与方法


        5. Element
            5.1 继承于Node，描述了所有相同种类的元素所普遍具有的方法和属性
            5.2 常用属性和方法
                Element.id    Element.className    Element.innerHTML    Element.tagName    
                Element.attributes    Element.classList   

                Element.getAttribute()     Element.setAttribute()   Element.removeAttribute()
                Element.getElementsByClassName()    Element.getElementsByTagName()
                Element.querySelector()     Element.querySelectorAll()


        6. HTMLCollection
            6.1 Element的集合，顺序按照Element在文档流中的顺序排列
            6.2 具有实时性，文档中的DOM树发生变化时也会跟着变化，不需要再重新获取
            6.2 常用属性和方法    
                HTMLCollection.item()   HTMLCollection.namedItem()


        Node和Element的区别
            1. DOM树中所有节点都是Node，包括很多类型，比如元素节点、文本节点、属性节点、注释节点等
            2. Element是Node的子类，是拥有元素节点、文本节点、属性节点、注释节点的特殊节点


*/ 

/*
    创建节点
        1. 创建Element节点
            element = document.createElement(tagName[, options]);
                newDiv = document.createElement("div"); 
        2. 创建文本节点
            text = document.createTextNode(data);
                newContent = document.createTextNode("Hi there and greetings!"); 
        3. 创建属性节点
            attribute = document.createAttribute(att_name);
                a = document.createAttribute("my_attrib");
                a.value = "newVal";
        4. 创建注释节点
            commentNode = document.createComment(data);
                comment = docu.createComment('这是注释内容');

*/ 



/*
    获取Element对象
        1. 通过元素ID获取Element对象
            element = document.getElementById(id);
        2. 通过元素类名获取Element对象集合HTMLCollection
            elements = parentNode.getElementsByClassName(class_name);   // parentNode可以是任何节点，比如document     
        3. 根据元素name属性值获取Element对象集合HTMLCollection
            elements = document.getElementsByName(name)
        4. 根据元素标签名获取
            elements = document.getElementsByTagName(tag_name);
    
    利用选择器获取获取Element对象
        1. element = document.querySelector(selectors);
            返回文档中与指定选择器或选择器组匹配的第一个html元素，没有返回null
        2. Nodes = parentNode.querySelectorAll(selectors);
            返回与指定的选择器组匹配的文档中的 静态 节点列表NodeList

*/


/*
    DOM树中的节点插入
        1. childNode = parentNode.appendChild(childNode)
            将一个子节点插入到父节点下，子节点下的节点也会跟着移动
            返回插入的子节点对象
            DocumentFragment : 可以理解为DOM树的子树
        2. parentNode.append(node1, node2, ...)
            可以一次插入多个节点或者是字符串
            没有返回值
        3. insertedNode = parentNode.insertBefore(insertedNode, referenceNode);
            将insertedNode插入parentNode子节点referenceNode的前面
            如果referenceNode=null，则插入到parentNode子节点列表的最后面
    
    DOM树中的节点删除
        1. oldChild = Node.removeChild(childNode);
            从Node节点中删除childNode节点，及其下面的子节点
            节点只是从DOM树中移除，还存在内存中
*/


/*
    修改节点属性
        1. 直接通过 node.style.attri_name = value 修改和添加属性
            n.style.color = 'white';
            n.style.backgroundColor = 'black';
        2. element.setAttribute(name, value);
            n.setAttribute("color", "white");
            n.setAttribute('class', 'highlight');   // highlight是CSS文件中定义的一组样式 .highlight{...}

*/