//工具中类和对象的区别就是可以作为一个隔离 ,如果是一个对象的话被修改了可能会影响其他

class MUtil {
    request(params) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: params.type || 'get',
                url: params.url || '',
                dataType: params.dataType || 'json',
                data: params.data || null,
                success(res){
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
                error(err) {
                    typeof reject==='function' &&reject(err.statusText);
                }
            })
        })
    }
    //跳转登录
    doLogin(){
        window.location.href ='/login?redirect='+encodeURIComponent(window.location.pathname);  //去跳转登录时带上当前页面路径
    }

    getUrlParam(name){
        let querySring=window.location.search.split('?')[1]||'',
            reg= new RegExp('(^|&)'+name+'=([^&]*)(&|$)'),
            result = querySring.match(reg);
        return result? decodeURIComponent(result[2]):null;
    }

    errorTips(errMsg){
        alert(errMsg||'好像哪里不对了~');
    }
}

export default MUtil;