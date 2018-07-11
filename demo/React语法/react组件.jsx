import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'Rosen',
            age:18
        }
    }
    //添加岁数
    handlClick(e){
        this.setState({
            age:this.state.age+1
        })
    }
    //输入框的值
    valueChange(e){
        this.setState({
            age:e.target.value
        })
    }
    render(){
        return <div>
            <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
            <button onClick={(e)=>{this.handlClick(e)}}>加一岁</button>
            <input onChange={(e)=>{this.valueChange(e)}}/>
        </div>
    }
}

class App extends React.Component{
    render () {
        return <div>
            <Title> <a href="">link</a></Title>
            <hr/>
            {/* 单纯组件   */}
            <Component ></Component>
        </div>
    }
}
// 3.容器式组件
class Title extends React.Component{
    render () {
        return <h1>{this.props.children}</h1>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));