
function createStore(reducer) {
    let state;
    let listeners = [];

    let getState = () => state;

    let dispatch = (action)=> {
        state = reducer(state,action);
        listeners.forEach(fn => fn())
    };
    dispatch({type:'@INIT'});

    let subscribe = (fn) => {
        listeners.push(fn);
        return () => {
            listeners.filter(l => l!==fn)
        }
    };

    return {
        getState,
        dispatch,
        subscribe
    }
}

let initState = {number:0};

const ADD = 'ADD';
const MINUS = 'MINUS';

function reducer(state = initState,action) {
    switch (action.type){
        case ADD:
            return {number: state.number + action.v};
        case MINUS:
            return {number: state.number - action.v}
    }
    return state
}
let store = createStore(reducer);
let counter = document.getElementById('counter');
let add = document.getElementById('add');
let minus = document.getElementById('minus');

counter.innerHTML = store.getState().number;

add.addEventListener('click',() => {
    store.dispatch({type:ADD,v:1});
    counter.innerHTML = store.getState().number;
});

minus.addEventListener('click',() => {
    store.dispatch({type:MINUS,v:3});
    counter.innerHTML = store.getState().number;
});