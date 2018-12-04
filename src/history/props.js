import React,{Component} from 'react'

// 用来校验属性类型
import PropTypes from 'prop-types'


class Person extends Component {

    // 默认属性必须名字叫 defaultProps 属于类上的属性  es7
    static defaultProps = {
        name: 'zx'
    };

    // 专门用来校验类型的
    static propTypes = {
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['男','女']),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        hobby: PropTypes.arrayOf(PropTypes.string),
        salary(props,propName,componentName){
            if(props[propName] <= 10000){
                throw new Error('收益太低')
            }
        }

    };

    render(){
        return <div>
            hello welcome {this.props.name}
        </div>
    }
}

let obj = {
    name:'zx',
    age: 27,
    gender: '男',
    position: {
        x: 100,
        y: 100
    },
    hobby:['睡觉'],
    salary: 1000
};


export {
    Person,
    obj
}

// import {Person,obj}  from './history/props'
// render(<Person {...obj}/>,window.root);