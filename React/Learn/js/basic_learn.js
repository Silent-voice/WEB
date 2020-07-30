'use strict';   // 严格语法格式

/*
    1. 直接应用React，通过CDN服务器获取
        开发模式
            <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        生产模式
            <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>

*/ 


/*
    1. 元素
        1. React元素是简单的JS对象，对应着一个DOM元素
        2. React中使用ReactDOM管理所有DOM，负责React元素与DOM元素之间的映射
        3. React元素是不可变对象，无法改变子元素和属性，只能创建全新的对象覆盖之前的对象
    
    2. React元素生成
        1. React可以使用JS的方式生成React元素
            React.createElement(type, [props], [...children)    返回一个React元素
                type : 组件类型
                props : 组件参数，和HTML中写法一样
                children : DOM树中组件的子节点
        2. 也可以使用JSX方式生成React元素，不过需要使用babel插件将JSX代码转换成JS代码才能运行
            1 JSX = HTML + JS，来替代React.createElement()函数来生成React元素
            2 JSX的方式更加贴近HTML，更加直观
            3 JSX表达式会被转换成React.createElement()函数，返回一个JS对象，可以进行对象的正常操作

    3. 组件
        1. 类似于函数，接受任意参数 props ，返回用于描述页面展示内容的React元素
            return null;    不进行任何渲染，相当于隐藏
        2. 组件名称必须以大写字母开头，小写字母开头的会被识别为HTML原生标签
        3. 组件调用
            JS : React.createElement(组件名, [props], [...children)
            JSX : <组件名 [key1=value1,key2=value2]/>
        4. 组件可以任意嵌套，生成更复杂的组件
        5. 组件不允许修改参数 props 

    4. 组件内属性和方法
        1. state
            组件的私有属性
        2. componentDidMount()
            挂载函数，当组件被一次被渲染时调用
        3. componentWillUnmount()
            卸载函数，组件被删除时调用
        4. setState()
            更新组件state

    5. setState()注意点
        1. 直接修改state是不会重新渲染的
            this.state.comment = 'Hello';   // Wrong
            this.setState({comment: 'Hello'});  // Correct
        
        2. setState()更新是异步的，多个setState()调用可能会合并成一个调用
            // Wrong
            this.setState({
                counter: this.state.counter + this.props.increment,
            });

            // Correct 传入一个函数，使用上一次执行结果作为输入，这样就不会被合并
            this.setState(function(state, props) {
                return {
                    counter: state.counter + props.increment
                };
            });


    3. React常用类和函数
        1. React.Component
            1. 组件类，自定义组件可以继承于该类
            2. render()
            3. this.state
                对象，组件自定义属性都要放在其中
            4. this.setState
                异步修改this.state中的值
        
        2. ReactDOM
            1. 可以直接调用DOM API的对象
            2. ReactDOM.render(element, container[, callback])
                将React元素element插入到container容器中，会覆盖掉之前的内容
                第一次调用时会重新渲染container容器中所有的DOM元素，后续调用只会重新渲染有修改的DOM元素
                该函数只负责修改container容器中的子元素，不会对container容器本身造成影响


*/

// import React from 'react'


class LikeButton extends React.Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return React.createElement(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );

        /*
        JSX写法
            return (
                <button onClick={() => this.setState({ liked: true })}>
                    Like
                </button>
            );
        */

    }
}

const domContainer = document.querySelector('#root');

ReactDOM.render(
    React.createElement(LikeButton), 
    domContainer
);