
import React from 'react';
import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

//通用分页
class Pagination extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(<div className='row'>
                <div className='col-md-12'>
                    <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
                </div>
        </div>)
    }
}

export default Pagination;
