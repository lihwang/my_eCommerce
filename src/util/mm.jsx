//工具中类和对象的区别就是可以作为一个隔离 ,如果是一个对象的话被修改了可能会影响其他

class MUtil {
    //发送请求
    request(params) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: params.type || 'get',
                url: params.url || '',
                dataType: params.dataType || 'json',
                data: params.data || null,
                success:(res)=>{
                    //数据请求成功
                    if(0===res.status){
                      typeof resolve==='function' &&resolve(res.data,res.msg)
                    //做登录，强制登录
                    }else if(10===res.status){
                        this.doLogin();
                    }else{
                        typeof reject==='function' &&reject(res.msg||res.data)
                    }
                },
                error:(err) =>{
                    typeof reject==='function' &&reject(err.statusText);
                }
            })
        })
    }
    //跳转登录
    doLogin(){
        window.location.href ='/login?redirect='+encodeURIComponent(window.location.pathname);  //去跳转登录时带上当前页面路径
    }
    //获取跳转地址
    getUrlParam(name){
        let querySring=window.location.search.split('?')[1]||'',
            reg= new RegExp('(^|&)'+name+'=([^&]*)(&|$)'),
            result = querySring.match(reg);
        return result? decodeURIComponent(result[2]):null;
    }
    //错误提示
    errorTips(errMsg){
        alert(errMsg||'好像哪里不对了~');
    }
    //存储内容
    setStorage(name,data){
        let dataType=typeof data;
        if(dataType ==='object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType)>0){
            window.localStorage.setItem(name,data);
        }else{
            alert('该类型不支持本地存储！');
        }
    }
    //取出内容
    getStorage(name){
        let data=window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data)
        }else{
            return '';
        }
    }

    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;