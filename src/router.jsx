
//常见的路由

//页面路由
window.location.href='http://www.baidu.com';
history.back();//后退

//hash 路由
window.location.hash='#hash';
window.onhashchange=function(){
    console.log('current hash:'+window.location.hash);
}


//h5路由
history.pushState('name','title','/path');
history.replaceState('name','title','/path');
window.onpopstate=function(){

}



//React-Router

// 路由方式
// <BrowserRouter>==>h5路由   
// <HashRouter>==>hash 路由

//<Router>   路由规则  
//<Switch>    路由选项

//<Link/> / <NavLink/>  跳转

//<Redirect/>  自动跳转