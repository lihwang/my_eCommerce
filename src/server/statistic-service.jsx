import MUtil from 'util/mm.jsx';
let _mm=new MUtil();
class Statistic{
    getHomeCount(){    //内部的请求本身封装的就是promise请求
        return _mm.request({
            type:'get',
            url:'/manage/statistic/base_count.do',
        })
    }
}

export default Statistic;
