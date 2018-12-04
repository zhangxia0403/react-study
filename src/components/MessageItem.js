import React,{Component} from 'react'
import {Consumer} from './context'
class MessageItem extends Component{

    handleClick=()=>{
        // 执行从上面传递下来的方法
        this.props.fn(2)
    };

    render(){
        return (
            <Consumer>
                {/*Consumer 里面是一个函数 {({reset})=>{}} reset是 Provider中value属性里方法对应的key值*/}
                {/*<Provider value={{reset:this.resetClick}}>*/}
                {({reset})=>{
                    return <li className="list-group-item">
                        <h4>{this.props.list.title}</h4>
                        {/*自定义一个事件 主要是用来执行来自父级传递过来的方法*/}
                        {/*跨组件 第一种通过属性一层层传递*/}
                        <button onClick={this.handleClick} className="btn btn-primary">点赞</button>
                        {/*跨组件 第二种 通过context Api*/}
                        <button className="btn" onClick={()=>{reset(2)}}>取消</button>
                    </li>
                }}
            </Consumer>

        )
    }
}
export default MessageItem