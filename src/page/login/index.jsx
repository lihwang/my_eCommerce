import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'server/user-service.jsx';
import './index.scss';

let _mm=new MUtil();
let _user=new User();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect:_mm.getUrlParam('redirect')||'/'
        }
    }

    componentWillMount(){
        document.title='登录 - 李成杰';
    }

    onInputChange(e){
        let inputName=e.target.name;
        this.setState({
            [inputName]:e.target.value
        })
    }

    //表单提交
    onSubmit(){
        let loginInfo={username:this.state.username,password:this.state.password},
        checkResult=_user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login(loginInfo).then((res)=>{
                _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect);    //React内置的页面跳转
            },(errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }else{
            //验证不通过
            _mm.errorTips(checkResult.msg)
        }
      
    }

    onInputKeyUp(e){
       if(e.keyCode===13){
           this.onSubmit();
       } 
    }

    render() {
        return <div className='col-md-4 col-md-offset-4'>
            <div className="panel panel-default login-pannel">
                <div className="panel-heading">欢迎登录 - MALL后台</div>
                <div className="panel-body">
                    <div>
                        <div className="form-group"><input type="text" name='username' onKeyUp={(e)=>{this.onInputKeyUp(e)}} onChange={(e)=>this.onInputChange(e)} className="form-control" placeholder="请输入用户名"/></div>
                        <div className="form-group"><input type="password" name='password' onKeyUp={(e)=>{this.onInputKeyUp(e)}} onChange={(e)=>{this.onInputChange(e)}} className="form-control" placeholder="请输入密码"/></div>
                        <button onClick={()=>{this.onSubmit()}} className="btn btn-lg btn-primary btn-block">登录</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Login;