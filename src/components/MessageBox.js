import React,{Component} from 'react'
import axios from 'axios'

import MessageRight from './MessageRight'
import MessageLeft from './MessageLeft'
import {Provider} from './context'

// axios 拦截请求
axios.interceptors.request.use(function (config) {
    // 设置请求头
    config.headers = {
        token: 'xxx'
    };
    return config;
});

// axios 拦截响应
axios.interceptors.response.use(function (res) {
    if(res.data.code === 1){
        return res.data;
    }
    return Promise.reject();
});

class MessageBox extends Component{
    state = {
        lists: [],
        total: 0
    };

    handleClick = val =>{
        this.setState({
            total: this.state.total + val
        })
    };

    resetClick = val => {
        this.setState({
            total: this.state.total - val
        })
    };

    // fetch 原生提供的 基于promise  太底层
    // axios 基于promise 拦截器
    // 只有一个接口时，可以用async，
    async componentDidMount(){
        // 获取ajax数据
        let {data} = await axios.get('/list.json');
        this.setState({
            lists: data
        })
    }

    render(){
        return (
            // Provider 提供的值必须有一个叫value的属性
            <Provider value={{reset:this.resetClick}}>
                <div>
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            列表点赞
                        </div>
                        <div className="panel-body">
                            <MessageRight fn={this.handleClick} lists={this.state.lists}/>
                        </div>
                        <div className="panel-footer">
                            <MessageLeft total={this.state.total}/>
                        </div>
                    </div>
                </div>
            </Provider>
        )


    }
}
export default MessageBox