// 受控组件
// 和状态相关的，状态一变视图跟着变化  类似 双向数据绑定
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class Control extends Component{

    state = {
        username: 'zx',
        password: '123455'
    };

    handleChange = (e) => {
        // console.log(e.target.value);
        console.log(e.target);
        this.setState({
            // username: e.target.value,
            // 上面的写法只适合页面只有一个input时，如果有多个，需要给每个不同input绑定不同的函数
            // 下面的可以控制多个input，但需要给input设置name，并且需要和后面的状态名保持一致
            [e.target.name]: e.target.value
        })
    };

    handleClick = (e) => {
        e.preventDefault();
        alert(JSON.stringify(this.state))
    };

    render(){
        return (<div>
            {/*form 自带表单验证*/}
            <form onSubmit={this.handleClick}>
                {/*required 表单提交是自动校验输入框是否为空*/}
                <input required type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button type="submit">提交</button>
            </form>
        </div>)
    }
}

ReactDOM.render(<Control/>,window.root);