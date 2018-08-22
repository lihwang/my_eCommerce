import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx';
import MUtil from 'util/mm.jsx';
import User from 'server/user-service.jsx';

let _mm=new MUtil();
let _user=new User();

class UserList extends React.Component {
    constructor(){
        super();
        this.state={
            pageNum:1,
            list:[]
        }
    }

    componentDidMount(){
        this.loadUserList();
    }

    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res);
        },(errMsg)=>{
            this.setState({
                list:[]
            })
        _mm.errorTips(errMsg)
        })
    }

    onPageNumChange(pageNum){
        this.setState({
            pageNum
        },()=>{
            this.loadUserList();
        })
    }
    render() {
        let listBody=  this.state.list.map((user,index)=>{
            return (<tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createTime).toLocaleString()}</td>
            </tr>)
        });
      
        return <div id='page-wrapper'>
          <PageTitle title='用户列表'></PageTitle>
            <div className="row">
                <div className='col-md-12'>
                    <table className='table table-striped table-bordered'>
                        <TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
                            {listBody}
                        </TableList>
                    </table>
                </div>
            </div>
            <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum=>this.onPageNumChange(pageNum)}></Pagination>
        </div>
    }
}

export default UserList;