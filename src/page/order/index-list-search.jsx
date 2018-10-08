import React from 'react';


class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orderNumber:''
        }
    }
    //改变值
    onValueChange(e){
        let name=e.target.name,value=e.target.value.trim();
        this.setState({
            [name]:value
        })
    }
    //点击搜索时触发传进来上绑定的onSearch事件
    onSearch(){
        this.props.onSearch(this.state.orderNumber);
    }

    //键盘搜索
    onSearchKeyWordKeyUp(e){
        if(e.keyCode==13){
            this.onSearch();
        }
    }

    render() {
        return <div className="form-inline">
        <div className="form-group">
            <select className="form-control" name='searchType' onChange={(e)=>{this.onValueChange(e)}}>
                <option value="">按订单号查询</option>
            </select>
        </div>
        <div className="form-group">
            <input type="text" name='orderNumber' onKeyUp={e=>this.onSearchKeyWordKeyUp(e)} onChange={(e)=>this.onValueChange(e)}  className="form-control" id="exampleInputPassword3" placeholder="订单号" />
        </div>
        <button className="btn btn-primary" onClick={(e)=>{this.onSearch()}}>搜索</button>
    </div>
    }
}

export default ListSearch;