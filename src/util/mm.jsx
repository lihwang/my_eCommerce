//工具中类和对象的区别就是可以作为一个隔离 ,如果是一个对象的话被修改了可能会影响其他

class MUtil {
    request(params) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: params.type || 'get',
                url: params.url || '',
                dataType: 'param.dataType' || 'json',
                data: params.data || null,
                success: res => {
                    //数据请求成功
                    if(0===res.stauts){
                      typeof resolve==='function' &&resolve(res.data,res.msg)
                    //做登录，强制登录
                    }else if(10===res.staus){
                        this.doLogin();
                    }else{
                        typeof reject==='function' &&reject(res.msg,res.data)
                    }
                },
                error: err => {
                    typeof reject==='function' &&reject(err.statusText);
                }
            })
        })
    }
    //跳转登录
    doLogin(){
        window.location.href ='/login?redirect='+encodeURIComponent(window.location.pathname);
    }


}

export default MUtil;