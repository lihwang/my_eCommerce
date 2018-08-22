import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

//页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';

//Layout 主体布局 每个页面都要用，然后Router去切换中间内容
class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Switch>
            <Route path='/product/index' component={ProductList} />
            <Route path='/product/save' component={ProductSave} />
            <Redirect exact path='/product' to='/product/index'/>
        </Switch>
    }
}

export default ProductRouter;