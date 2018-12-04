// 非受控组件 没有状态
// 使用非受控组件好处，可以和第三方库使用（操作dom）
// 如果只是点击获取输入框的值，推荐使用非受控组件
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

class Control extends Component{

    // 与第二种配合使用 把当前的password绑定到current属性上
    password = React.createRef();

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.username.value);
        // 第二种方式比第一种应用要多一层
        console.log(this.password.current.value);
    };

    render(){
        return (<div>
            {/*form 自带表单验证*/}
            <form onSubmit={this.handleClick}>

                {/*required 表单提交是自动校验输入框是否为空*/}
                {/*第一种方式*/}
                {/*dom 指的就是当前的输入框 把输入框挂在username的实例上 */}
                <input required type="text" name="username" ref={(dom)=>this.username=dom} />

                {/*第二种方式*/}
                <input type="text" name="password" ref={this.password}/>

                <button type="submit">提交</button>
            </form>
        </div>)
    }
}

ReactDOM.render(<Control/>,window.root);