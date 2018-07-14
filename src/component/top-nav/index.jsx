import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'server/user-service.jsx';

let _mm=new MUtil();
let _user=new User();
class TopNav extends React.Component {
    constructor() {
        super();
        this.state={
            username:_mm.getStorage('userInfo').username
        }
    }
    //退出登录
    onLogout(){
        _user.logout().then(res=>{
            _mm.removeStorage('userInfo')
            window.location.href='/login';
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    render() {
        return <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="index.html">
                    <b>李成杰</b> 后台</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        {
                            this.state.username?
                            <span>欢迎，{this.state.username}</span>:
                            <span>欢迎您</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={()=>{this.onLogout()}} href='javascript:;'>
                                <i className="fa fa-sign-out fa-fw"></i>
                                <span>退出登录</span></a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    }
}

export default TopNav;