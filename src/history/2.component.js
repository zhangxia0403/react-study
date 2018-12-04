// 组件的特点 和 好处

// react中 函数就是一个组件
// 组件名 必须大写，是为了和jsx元素 react 元区分

/*
 组件的分类 函数组件 类组件

函数组件：
    1、没有this指向
    2、没有生命周期
    3、没有状态

* */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'


// 所有的组件都有属性（使用的人 可以提供这些属性）
// function Clock(props) {
//     // toLocaleString() 可根据本地时间把Date对象转换为字符串，并返回结果
//     return <h1>当前时间 {props.date.toLocaleString()}</h1>
// }

/*
类组件：
    1、this指向实例
    2、有生命周期
    3、有状态 this.state是个对象
* */
// 实现一个类  父类提供了一个更改自己状态的方法
// React.Component是父类 提供了 例如：setState
class Clock extends Component{
    constructor(props){
        console.log(props);
        super(props);
        this.state = { // this.state这个名字不能修改，固定写法
            date:new Date().toLocaleString()
        };
    }

    // 跟上面的this.state是同一个，不同的写法，取一即可
    // state = {};

    // 生命周期函数 组件已经挂载完成
    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({ // 调用setState会更新视图
                date:new Date().toLocaleString()
            });
        },1000)
    }

    // 组件将要更新
    componentWillUpdate(){
        // 在调用handleDelete前把定时器清除，不然会报错
        // 组件已经卸载，但是定时器还在执行，会出错
        clearInterval(this.timer);
    }

    handleClick(){
        console.log(this); // undefined 外界调用类里面的函数是不合法的，所以要绑定this
    }
    // 这两种改变this的优缺点：
    // 上面绑定this，每次调用函数都会产生一条函数
    // 下面的箭头函数不好传参数，要是传参数可以在调用的地方在包一层箭头函数 (params)=>this.handleDelete
    handleDelete = ()=>{
        console.log(this); // this指向的实例
        ReactDOM.unmountComponentAtNode(window.root);  // 从这个节点上卸载组件
    };

    render(){
        // console.log(this);
        return (<div>
                <h1>当前时间 {this.state.date} </h1>
                <button onClick={this.handleClick.bind(this)}>点击</button>
                <button onClick={this.handleDelete}>点击删除</button>
            </div>)
    }
}

export default Clock;

// 组件
// import Clock from './history/2.component'
// 可以和jsx元素 混用
// render(<div>
//         <Clock date={new Date()}/>
//     </div>,window.root);

// render(<div>
//     <Clock/>
// </div>,window.root);