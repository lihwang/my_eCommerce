import React from 'react';
import {Link,NavLink} from 'react-router-dom';

//NavLink  activeClassName='active-menu'  当发现to内容和当前页面是一样的就会加上activeClassName
class SideNav extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div className="navbar-default navbar-side">
            <div className="sidebar-collapse">
                <ul className="nav">
                    <li>
                        <NavLink exact activeClassName='active-menu' to="/"><i className="fa fa-qrcode"></i>首页</NavLink>
                    </li>

                    <li className='active'>
                        <Link to="/product">
                            <i className="fa fa-list"></i>
                            商品
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/product" activeClassName='active-menu'>商品管理</NavLink>
                            </li>
                            <li>
                                <NavLink to="/product-category" activeClassName='active-menu'>品类管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className='active'>
                        <Link to="/order">
                            <i className="fa fa-check-square-o"></i>
                            订单
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/order" activeClassName='active-menu'>订单管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className='active'>
                        <Link to="/user">
                            <i className="fa fa-user-o"></i>
                            用户
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/user" activeClassName='active-menu'>用户管理</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default SideNav;