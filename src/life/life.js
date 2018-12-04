import React from 'react'
import ReactDOM from 'react-dom'

/*
 面试可能会遇到的问题，什么时候调用setState
 可以在这三个函数中操作
 componentWillMount
 componentDidMount
 componentWillReceiveProps  官方不建议在此使用
 其他的生命周期都不能调用setState，因为这些函数会执行多次，可能会造成死循环

 * */

// 子组件
// 父组件更新子组件就会更新
// 子组件会先渲染完成，然后父组件才会渲染完成（洋葱圈模型）
// 父组件渲染 -> 子组件跟着渲染 -> 子组件渲染完成 -> 父组件渲染完成
class Children extends React.Component {

    state={};

    // componentWillMount(){
    //     console.log('child componentWillMount');
    // }

    render(){
        console.log('child render');
        return <div>
            我是父组件传过来的属性值 {this.props.num}
            <br/>

            我是getDerivedStateFromProps的返回值 {this.state.num}
            {/* this.state.num 就是 getDerivedStateFromProps的返回值*/}
        </div>
    }

    // 生命周期都是同步的 但是ajax是异步的 此函数一定会更新两次
    // 可以在这里操作DOM
    componentDidMount(){
        console.log('child componentDidMount');
    }

    // // 组件接收到新的属性（第一次不触发）
    // componentWillReceiveProps(newProps){
    //     console.log(newProps);
    //     console.log('componentWillReceiveProps');
    //     // 接受带新的属性后 可能会有人把接受的属性放到状态上
    //     // 官方不建议在此操作setState
    // }
    // 代替 componentWillReceiveProps,解决第一次不能触发的bug
    static getDerivedStateFromProps(newProps){
        // 使用了新的api就不能使用废弃的 componentWillMount
        // 使用此函数需要一个state，没有可以设置一个空的state={}
        // 此方法就不会显示调用setState
        // 需要返回值
        console.log(newProps);  // 第一次就会执行
        return newProps
    }
}

class Couter extends React.Component {
    // 组件的默认属性
    static defaultProps = {
        name: 'zx'
    };
    state = {
        count: 1
    };

    constructor(props){
        super(props);
        console.log(props);
    }

    // 组件将要被挂载
    // componentWillMount(){
    //     // 16.3 之后使用新api 就不采用此方法了
    //     // 只里面的逻辑可以放在constructor里
    //     console.log('componentWillMount');
    // }

    // 询问组件是否要更新
    shouldComponentUpdate(nextProps,nextState) {
        // 函数最终返回的是boolean
        // 我们可以在这里做一些优化，添加一些属性或状态的判断，来减少render函数的渲染
        // 但不管函数返回的是true，还是false 状态都是会更新，false不会执行render刷新视图，true会
        return nextState.count%2 !== 0;
    }

    // 渲染
    render(){
        console.log('render');
        return <div>
            {this.state.count}
            {/*子组件*/}
            <Children num={this.state.count}/>
            <button onClick={() => {
                // 无论数据是否会发生变化 都会调用render方法
                this.setState({
                    count: this.state.count + 1
                })
            }}>添加</button>
        </div>
    }

    // 组件挂载结束
    componentDidMount(){
        console.log('componentDidMount');
    }

    // 组件将要被更新
    // componentWillUpdate(){
    //     console.log('componentWillUpdate');
    // }
    // 新的api 代替componentWillUpdate
    // 如果使用了新的api componentWillMount也不能使用,会报错
    getSnapshotBeforeUpdate(prevProps,prevState){
        // Snapshot 快照
        console.log('组件将要更新');
        // 函数必须要有一个返回值，不能返回undefined
        // 如果函数返回的是一个对象，他会放在componentDidUpdate 第三个参数中
        return {a:1}
    }

    // 组件已经更新完成
    componentDidUpdate(a,b,c){
        console.log('getSnapshotBeforeUpdate返回的对象',c);
        console.log('componentDidUpdate');
    }


}


// ReactDOM.render(<Couter/>,window.root);