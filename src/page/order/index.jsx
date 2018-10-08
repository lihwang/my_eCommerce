import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import MUtil from 'util/mm.jsx';
import Order from 'server/order-service.jsx';
import TableList from 'util/table-list/index.jsx';
import {Link} from 'react-router-dom'
import ListSearch from './index-list-search'

let _mm=new MUtil();
let _order=new Order();

class OrderList extends React.Component {
    constructor(){
        super();
        this.state={
            pageNum:1,
            list:[],
            listType:'list',
            orderNumber:''
        }
    }

    componentDidMount(){
        this.loadOrderList();
    }
    //加载商品列表
    loadOrderList(){
        let listParam={};
        listParam.listType=this.state.listType;
        listParam.pageNum=this.state.pageNum;
        //搜索必须传条件
        if(this.state.listType=='search'){
            listParam.orderNo=this.state.orderNumber;
        }
        _order.getOrderList(listParam).then(res=>{
            this.setState(res);
        },(errMsg)=>{
            this.setState({
                list:[]
            })
        _mm.errorTips(errMsg)
        })
    }
    //当翻页时
    onPageNumChange(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadOrderList();
        })
    }

    //子组建回调的搜索
    onSearch(orderNumber){
        let listType = orderNumber===''?'list':'search';
        this.setState({
            listType:listType,
            pageNum:1,
            orderNumber:orderNumber
        },()=>{
            this.loadOrderList();
        })
    }

    render() {
        let tableHeads=[
            '订单号',
            '收件人',
            '订单状态',
            '订单总价',
            '创建事件',
            '操作'
        ];
        return <div id='page-wrapper'>
          <PageTitle title='订单列表'/>
          <div className='row search-wrap'>
            <div className='col-md-12'>
                <ListSearch onSearch={(orderNumber)=>{this.onSearch(orderNumber)}}></ListSearch>
            </div>
          </div>
          <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((order,index)=>{
                        return (<tr key={index}>
                            <td>
                                <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                            </td>
                            <td>{order.receiverName}</td>
                            <td>{order.statusDesc}</td>
                            <td>¥{order.payment}</td>
                            <td>{order.createTime}</td>
                            <td>
                                <Link to={`/order/detail/${order.orderNo}`}>查看详情</Link>
                            </td>
                        </tr>)
                    })
                }
          </TableList>
            <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum=>this.onPageNumChange(pageNum)}></Pagination>
        </div>
    }
}

export default OrderList;