import MUtil from 'util/mm.jsx';
let _mm=new MUtil();
class User{
    login(loginInfo){    //内部的请求本身封装的就是promise请求
        return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:loginInfo
        })
    }

    logout(){
        return _mm.request({
            type:'post',
            url:'/user/logout.do',
            data:loginInfo
        })
    }

    //检查登录接口合法不
    checkLoginInfo(loginInfo){
        let username=$.trim(loginInfo.username);
        let password=$.trim(loginInfo.password);
        //判断用户名为空
        if(typeof username!=='string' ||username.length===0){
            return {
                status:false,
                msg:'用户名不能为空'
            }
        }
        //判断密码为空
        if(typeof password!=='string' ||password.length===0){
            return {
                status:false,
                msg:'密码不能为空'
            }
        }

        return {
            status:true,
            msg:'验证通过'
        }
    }

    getUserList(pageNum){
        return _mm.request({
            type:'post',
            url:'/manage/user/list.do',
            data:{
                pageNum:pageNum
            }
        })
    }
}

export default User;