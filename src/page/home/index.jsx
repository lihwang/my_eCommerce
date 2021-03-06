import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss'
import MUtil from 'util/mm.jsx';
import Statistic from 'server/statistic-service.jsx';

let _mm=new MUtil();
let _statistic=new Statistic();
import PageTitle from 'component/page-title/index.jsx'

class Home extends React.Component {
    constructor(){
        super();
        this.state={
            userCount:'-',
            productCount:'-',
            orderCount:'-'
        }
    }

    loadCount(){
        _statistic.getHomeCount().then(res=>{
            this.setState(res)
        },error=>{
            _mm.errrTips(error);
        })
    }

    componentDidMount(){
        this.loadCount();
    }

    render() {
        return <div id='page-wrapper'>
            <PageTitle title='首页123'>
            </PageTitle>
            <div className="row">
                <div className="col-md-4">
                    <Link to='/user' className='color-box brown'>
                        <p className='count'>{this.state.userCount}</p>
                        <p className='desc'>
                                <i className='fa fa-user-o'></i>
                                <span>用户数量</span>
                        </p>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to='/product' className='color-box green'>
                        <p className='count'>{this.state.productCount}</p>
                        <p className='desc'>
                                <i className='fa fa-list'></i>
                                <span>商品总数</span>
                        </p>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to='/order' className='color-box blue'>
                        <p className='count'>{this.state.orderCount}</p>
                        <p className='desc'>
                                <i className='fa fa-check-square-o'></i>
                                <span>订单总数</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    }
}

export default Home;