import React from 'react'
import ReactDom from 'react-dom'

// import React from 'react'  // 导入的React必须大写
// import { render } from 'react-dom'

/*
 jsx语法 javascript+html 混写，需要用babel转译
 babel转译时 转换成 React.createElement写法，要是react小写就识别不了
 */

// 只有一个子元素时
// let h1 = <h1 id="hello">hello world</h1>;
// => React.createElement('h1',{id:'hello'},['hello world']);

// 多个子元素(React.createElement层层嵌套)
// let h1 = <h1 id="hello">hello world <span>你好</span></h1>;
// => React.createElement('h1',{id:'hello'},['hello world',React.createElement('span',null,['你好'])]);

// jsx -> React.createElement() -> vnode(对象 对象可以描述当前元素) -> 渲染到页面上

// 自定义模块
// let React = {
//     createElement(type,props,...children){
//         console.log(...children);
//         return {
//             type,
//             props,
//             children
//         }
//     }
// };
//
// let render = (vnode,container) => {
//     if(typeof vnode == 'string') return container.appendChild(document.createTextNode(vnode ));
//     let {type,props,children} = vnode;
//     let ele = document.createElement(type);
//     for(let key in props){
//         ele.setAttribute(key,props[key]);
//     }
//     children.forEach(child => {
//         render(child,ele);
//     });
//     container.appendChild(ele);
// };
//
// let h1 = <h1 id="hello">hello world <span>你好</span></h1>;
// // console.log(h1);
// render(h1,window.root);


// jsx 语法
/*
1、如果渲染两个相邻的jsx元素，需要被外面一层标签包裹，如果不想让外面标签占位，可以用空标签表示<></>
2、行内写法，jsx为了识别是html还是js分别用 < 和 { 区分，所以js外面要包层{}
3、{} 表示里面包裹的是js、三元表达式、取值，只要有返回的内容就能显示
4、行内样式写法，style={{backgeound:'red'}} 一般是双大括号，外面表示里面是js语法，里面表示包裹的是对象，即一个js对象
5、属性的名字有变化，class是关键字，我们在定义类名的时候用className  还有 for => htmlFor
6、v-html 把内容当成html插入到页面中 dangerouslySetInnerHTML={{__html:xxx}}
7、列表渲染用map 因为map默认有返回值，数组可以直接渲染到页面上
   注意：每个循环都要加上个key值，循环谁就在谁身上加上key值
* */


let str = '<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png" alt=""/>';

let Ele = (
    <>

        <h1 style={{backgeound:'red'}}>标题</h1>
        <div>{1==1 ? <span>对的</span> : <span>错的</span>} 三元表达式</div>
        <div className="box">定义类名用 calssName</div>
        <label htmlFor="text">此时要用htmlFor代替for</label>
        {/*将img插入到页面中  当前是一个危险的操作，不建议使用*/}
        <div dangerouslySetInnerHTML={{__html:str}}></div>
    </>
);

export default Ele;

// import Ele from './history/1.jsx'
// render(Ele,window.root);