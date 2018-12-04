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
            listeners.filter(l => l!=fn)
        }
    };

    return {
        getState,
        dispatch,
        subscribe
    }
}

let initState = {number:0};

function render(state = initState,action) {
    return state
}
let store = createStore(reducer);

counter.innerHTML = store.getState().number;
