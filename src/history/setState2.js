// 默认批量更新
let isBatchingUpdate = true;
let transcation = (component) => {
    component.state = component.pendingState;
    component.render();
    // 第二次就不默认批量更新了
    isBatchingUpdate = false;
};

class My {
    constructor(){
        this.state = {number:0};  // 自己的状态
        this.pendingState = { ...this.state }; // 队列 存放状态
    }

    setState(obj){
        if(isBatchingUpdate){
            this.pendingState = {...this.pendingState,...obj};
        }else {
            this.pendingState = {...this.pendingState,...obj};
            transcation(this)
        }

    }

    update(){  // setState批量更新函数

        /*
        在React的生命周期钩子和合成事件中，多次执行setState，会批量执行

        具体表现为，多次同步执行的setState，会进行合并，相同的key，后面的会覆盖前面的

        当遇到多个setState调用时候，会提取单次传递setState的对象，把他们合并在一起形成一个新的
        单一对象，并用这个单一的对象去做setState的事情，相同的key，后一个key值会覆盖前面的key值
        */
        this.setState({number: this.state.number + 1});
        this.setState({number: this.state.number + 2});
        this.setState({number: this.state.number + 3});


        // 为什么放到 setTimeout 中会渲染多次？
        // 会先执行transcation函数，此时isBatchingUpdate=false就不是批量操作，函数依次执行
        setTimeout(()=>{
            this.setState({number: this.state.number + 1});
            this.setState({number: this.state.number + 2});
            this.setState({number: this.state.number + 3});
        },0);

        transcation(this);

    }

    render(){
        console.log(this.state.number);
    }
}

let my = new My();
// 内部会先调用此函数
my.update();