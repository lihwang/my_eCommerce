import React from 'react';
import MUtil from 'util/mm.jsx';
import './index.scss';

let _mm=new MUtil();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onInputChange(e){
        let inputName=e.target.name;
        this.setState({
            [inputName]:e.target.value
        })
    }

    //表单提交
    onSubmit(){
        _mm.request({
            type:'post',
            url:'http://admintest.happymmall.com/manage/user/login.do',
            data:{
                username:this.state.username,
                password:this.state.password
            }
        }).then((res)=>{
            
        },(err)=>{

        })
    }

    render() {
        return <div className='col-md-4 col-md-offset-4'>
            <div className="panel panel-default login-pannel">
                <div className="panel-heading">欢迎登录 - MALL后台</div>
                <div className="panel-body">
                    <div>
                        <div className="form-group"><input type="text" name='username' onChange={(e)=>this.onInputChange(e)} className="form-control" placeholder="请输入用户名"/></div>
                        <div className="form-group"><input type="password" name='password' onChange={(e)=>{this.onInputChange(e)}} className="form-control" placeholder="请输入密码"/></div>
                        <button onClick={()=>{this.onSubmit()}} className="btn btn-lg btn-primary btn-block">登录</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Login;