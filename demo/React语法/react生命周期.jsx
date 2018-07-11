import React from 'react';
import ReactDOM from 'react-dom';

//生命周期
//  componentWillMount
//  render
//  componentDidMount
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:'Old Status'
        }
        console.log('初始化数据2：constructor2')
    }
    //组件将要渲染完成
    componentWillMount(){
        console.log('componentWillMount')
    }
    //组件已经挂载完成
    componentDidMount(){
        console.log('componentDidMount')
    }
    //将要接受父组件传来的Props时
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps')
    }

    //子组件是不是应该更新   （作出一些判断阻止DOM更新）
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }

    //组件将要更新
    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

    //组件更新完成
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    //组件将要销毁 (一般定时器移除之类的)
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    handleClick(){
        console.log('更新数据！')
        this.setState({
            status:'New Status'   
        })
        //state更新
        // constructor
        // componentWillMount
        // render
        // componentDidMount
    }
    render(){
        console.log('render')
        return <div>
        <div>APP</div>
        <button onClick={()=>{this.handleClick()}}>更新组件</button>
        </div>
    }
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:'Old Props',
            hasChild:true
        }
        console.log('初始化数据1：constructor1')
    }
    //  改变子组件的props
    onPropsChange(){
        console.log('改变Props!')
        this.setState({
            data:'New Props'
        })
        //改变子组件的props
        //componentWillReceiveProps
        //  shouldComponentUpdate
        //  componentWillUpdate
        //  render
        //  componentDidUpdate
    }

    // 通过标记位移除子组件
    onDestoryChild(){
        console.log('干掉子组件!')
        this.setState({
            hasChild:false
        }) 
    }
    render(){
        return <div>
            {this.state.hasChild?<Component data={this.state.data}/>:null}
            <button onClick={()=>{this.onPropsChange()}}>改变Props</button>
            <button onClick={()=>{this.onDestoryChild()}}>干掉子组件</button>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));