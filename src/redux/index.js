import React from 'react'
import ReactDOM from 'react-dom'



// redux 状态管理 把数据集中存放

// redux 中，状态是不能直接修改的
// 举个简单例子分析一下原因：
// // 当前组件的所有状态
// let state = {
//     title: '你好',
//     content:{content:'你是谁',color:'red'}
// };
// function renderTitle() {
//     state = { title: 'wold'};
//     // 此时我们直接操作state，会造成部分数据不准确
//     // 如果下面函数组件使用这个被修改的state时就会出错
//     // 因为state修改过后，不能保证他的准确性
//     let title = document.getElementById('title');
//     title.innerHTML = state.title.content;
// }
//
// function renderContent() {
//     let content = document.getElementById('container');
//     // 此时的state中已经丢失了content这部分数据了
//     // 下面的代码已经没有数据可取，就没有意义了
//     content.innerHTML = state.content.content;
//     content.style.background = state.content.color;
// }

// redux 中不能直接操作状态
// 如果任意一个组件状态想要更新状态，需要派发一个动作
// 每次更新状态 最好用一个新的状态对象覆盖 （时间旅行）
// 如果直接在原有的状态上修改，就不好区分上次状态与当前状态的差异

// 思索，怎么才能保证数据不会被直接操作？

// 为了保护状态不被外界修改，需要创建一容器，把它包起来
function createStore(reducer) {
    // 每个组件的初始状态会不一样，不利于store重复使用
    // 所以我们把默认设置的状态抽离出store，此时的state={}
    let state = {};

    // 存放渲染页面的方法renderApp
    let listeners = [];

    // 提供一个方法 将数据克隆一份，此时操作的就不是原始的数据了
    // 拷贝状态需要被外界使用的，所以把方法return
    let getState = ()=> JSON.parse(JSON.stringify(state));

    // 派发动作，更新state
    let dispatch = (action)=> {
        // 希望store里的数据能够尽可能的简单，重复使用
        // 就应避免里面有逻辑操作，可以将这部分抽离出去，存放到reducer中
        // switch (action.type){
        //     case 'CHANGE-TITLE-COLOR':
        //         state.title.color = action.color
        // }

        // 将状态和动作传给reducer
        // 返回的新state替换原来的state
        state = reducer(state,action);

        // 当状态更新时，重新渲染页面
        listeners.forEach(fn => fn())
    };


    let subscribe = (fn) => {
        listeners.push(fn);
        // 返回一个unsub
        return () => {
            listeners = listeners.filter(l => fn!=l);
        }
    };

    // state为空时，组件执行第一次获取的store中的state是空的，会出错
    // 所以，要先把组件内部设置的state赋值给store中的state
    dispatch({type:'@INIT'});

    return {
        getState,
        dispatch,
        subscribe
    }
}

// 当前所有组件的状态
let initState = { // 将状态抽离就不能直接修改
    title: { content: '你好',color: 'red' },
    content: { content: 'world',color: 'green' }
};


// 为了能更好的管理数据，可以重复使用数据
// 我们的store容器就不应该有逻辑，所以将数据和动作分离
// reducer 有两个参数 state 和 action
// 把组件内部设置的state赋值给store中的state
function reducer(state,action) {
    switch (action.type){
        case 'CHANGE-TITLE-COLOR':
            // 把state拷贝，只修改对应的状态,此时返回的是一个新的state
            return {...state,title:{...state.title,color:action.color}};
        case 'CHANGE-CONTENT-CONTENT':
            return {...state,content:{...state.content,content:action.content}}
    }
    // 如果没有匹配的动作，返回的还是组件设置的默认属性
    return initState
}

// 用一个变量接收容器内部的方法
// 把reducer传到容器中
let store = createStore(reducer);

// 更新页面
store.subscribe(renderApp);

// 不更新页面
let unsub = store.subscribe(() => console.log('更新了'));

// 希望1S后能把title的颜色改变
setTimeout(()=>{
    // 实现状态更新
    store.dispatch({type:'CHANGE-TITLE-COLOR',color:'gray'});
    // // 状态更新需要重新渲染页面
    // renderApp();
},1000);
setTimeout(()=>{
    unsub();
    store.dispatch({type:'CHANGE-CONTENT-CONTENT',content:'你是谁'});
},2000);

function renderTitle() {
    // state = {}; // 此时的state就不能直接操作了
    let title = document.getElementById('title');
    title.innerHTML = store.getState().title.content;
    // 取数据时就需要从store.getState()的方法里获取
    title.style.background = store.getState().title.color;
}

function renderContent() {
    let content = document.getElementById('container');
    content.innerHTML = store.getState().content.content;
}

function renderApp() {
    renderTitle();
    renderContent();
}
renderApp();