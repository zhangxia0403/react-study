import React,{Component} from 'react'

class MessageLeft extends Component{
    render(){
        return <div>点赞总数{this.props.total}</div>
    }
}
export default MessageLeft