
import React from 'react';

//通用列表
class TableList extends React.Component{
    constructor(){
        super()
        this.state={
            firstLoading:true  
        }
    }
    componentWillReceiveProps(){
        //只有挂载数据时才这样
        this.setState({
            firstLoading:false 
        })
    }
    render(){
        //表头信息
        let tableHeader = this.props.tableHeads.map((tableHeader,index)=>{
            if(typeof tableHeader==='object'){
                return <th key={index} width={tableHeader.width}>{tableHeader.name}</th>
            }else if(typeof tableHeader==='string'){
                return <th key={index}>{tableHeader}</th>
            }
        })
        //列表内容
        let listBody=this.props.children;
        //列表信息
        let listError=(<tr>
            <td colSpan={this.props.tableHeads.length} className='text-center'>{this.state.firstLoading?'正在加载数据...':'没有找到相应结果~'}</td>
        </tr>);
        let tableBody=listBody.length? listBody:listError;
        return( <div className="row">
                    <div className='col-md-12'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                               {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {
                            tableBody
                            }
                        </tbody>
                    </table>
                </div>
            </div>)
    }
}

export default TableList;
