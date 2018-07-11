// console.log('aaaaa') let a=123;  let test = () =>{      return a*2;  }
// console.log(test(a))

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
let test='测试4';
let names=['A','B','C']
let jsx = <div className='jsx'>
    <p>{test}</p>
    {names.map((name,index)=>{
        return <p key={index}>{name}</p>
    })}
</div>;




//事件绑定
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'Rosen',
            age:18
        }
        this.handlClick=this.handlClick.bind(this);  //handlClick改变this；
    }
    //添加岁数
    handlClick(){
        this.setState({
            age:this.state.age+1
        })
    }

    render(){
        return <div>
            <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
            <button onClick={this.handlClick}>加一岁</button>
        </div>
    }
}



ReactDOM.render(jsx, document.getElementById('app'));