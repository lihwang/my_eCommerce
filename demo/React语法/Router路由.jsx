import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom'

//HashRouter   http://localhost:8086/dist/#/  ===>   http://localhost:8086/dist/#/a
//BrowserRouter   http://localhost:8086/dist/ ===>   http://localhost:8086/a （直接请求到后端是没有资源的）
//this.props.match.path指的是当前
//一般统配的放后面   Switch只会进入一个
class A extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return <div>
            ComponentA
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={(route)=>{
                    return <div>当前组件是不带参数A</div>
                }}></Route>
                 <Route exact path={`${this.props.match.path}/sub`} render={(route)=>{
                    return <div>当前组件是不带参数sub</div>
                }}></Route>
                <Route path={`${this.props.match.path}/:id`} render={(route)=>{
                    return <div>当前组件是带参数A，参数是：{route.match.params.id}</div>
                }}></Route>
            </Switch>
        </div>
    }
}

class B extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            ComponentB
        </div>
    }
}

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div>
                <Link  to='/a'>组件A</Link><br/>
                <Link  to='/a/123'>带参数的组件A</Link><br/>
                <Link  to='/a/sub'>带路径的sub</Link><br/>
                <Link to='/b'>组件B</Link>
            </div>
            {this.props.children}
        </div>
    }
}
//this.props.match.params.id 组件内部只能通过这种凡事取参数
//这样 /a就匹配不到A了就要使用Switch了
//Route exact带这个参数完全匹配
var jsx = <Router>
        <Wrapper>
            <Route path='/a' component={A}></Route>        
            <Route path='/b' component={B}></Route>
        </Wrapper>
    </Router>;
ReactDOM.render(jsx, document.getElementById('app'));