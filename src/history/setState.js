import React,{Component} from 'react';
import ReactDom from "react-dom"

// 属性传到组件中不能更改
// 如果需要更改 把属性变为组件的状态
// 组件的数据来源 状态是自己的（可以更改），属性是外面的（不能更改）
class Counter extends Component{
    state = {
        count: this.props.count
    };

    handleClick = () => {

        // setState 批量更新的操作 但不是一直更新,只有第一次默认是批量更新
        // 多次执行setState，会批量执行,会进行合并，相同的key，后面的会覆盖前面的
        // this.setState({
        //     count: this.state.count +1
        // });
        // this.setState({
        //     count: this.state.count +2
        // });
        // this.setState({
        //     count: this.state.count +3
        // });

        // 为什么setState放到 setTimeout 中会渲染多次？
        // 会先执行transcation函数，此时isBatchingUpdate=false就不是批量操作，函数依次执行
        // setTimeout(()=>{
        //     this.setState({
        //         count: this.state.count +1
        //     });
        //     this.setState({
        //         count: this.state.count +2
        //     });
        //     this.setState({
        //         count: this.state.count +3
        //     });
        // },0);

        // setTimeout 这种操作是不合法的 react提供了下面这种方式
        // 每次都是基于上一次结果 在进行操作
        this.setState((prevState)=>({ count: prevState.count + 1 }));
        this.setState((prevState)=>({ count: prevState.count + 2 }));
        this.setState((prevState)=>({ count: prevState.count + 3 }));
        // => 等同于 可以在回调函数里面进行dom操作
        this.setState({count:this.state.count+1},()=>{
            this.setState({count:this.state.count+2},()=>{
                this.setState({count:this.state.count+3})
            })
        })

    };

    render(){
        return (<div>
            {this.state.count}
            <button onClick={this.handleClick}>添加</button>
        </div>)
    }
}
export default Counter;

// setState
// import Counter from './history/setState'
// render(<Counter count={10}/>,window.root);