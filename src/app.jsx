import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

//页面
import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';

//Layout 主体布局 每个页面都要用，然后Router去切换中间内容
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' render={props =><Layout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/product' component={Home} />
                                <Route path='/product-category' component={Home} />
                            </Switch>
                        </Layout>
                    } />
                </Switch>
            </Router>
        </div>
    }
}
ReactDOM.render(<App />, document.getElementById('app'));