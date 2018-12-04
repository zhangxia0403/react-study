import React,{Component} from 'react'
import MessageItem from './MessageItem'

class MessageRight extends Component{
    render(){
        return (<ul className="list-group">
            {this.props.lists.map((list,key) => (
                // key属性被内置了，不会作为属性传递
                <MessageItem fn={this.props.fn} list={list} key={key}/>
            ))}
        </ul>)
    }
}
export default MessageRight