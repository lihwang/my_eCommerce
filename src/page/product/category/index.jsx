import React from 'react';
import {Link} from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'server/product-service.jsx';

let _mm=new MUtil();
let _product=new Product();

class CategoryList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            parentCategoryId:props.match.params.categoryId||0,
            list:[]
        }
    }

    componentDidMount(){
        this.loadCategoryList();
    }
    //加载品类
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res=>{
            this.setState({
                list:res
            });
        },(errMsg)=>{
            this.setState({
                list:[]
            })
        _mm.errorTips(errMsg)
        })
    }
    //当前页更新品类列表
    componentDidUpdate(prevProps,prevStates){
        let oldPath=prevProps.location.pathname,
         newPath=this.props.location.pathname,
         newId=this.props.match.params.categoryId||0;
         if(oldPath!==newPath){
             this.setState({
                 parentCategoryId:newId
             },()=>{
                 this.loadCategoryList();
             })
         }
        console.log(this.props.match.params.categoryId);
    }
    //更新品类的名字
    onUpdateName(categoryId,categoryName){
        let newName=window.prompt('请输入新的品类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId:categoryId, 
                categoryName:newName
            }).then((res)=>{
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg=>{
                this.setState({
                    list:[]
                })
                _mm.errorTips(errMsg);
            })
        }
    }

    

 
    render() {
        let listBody=  this.state.list.map((category,index)=>{
            return (<tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <a className='opear' onClick={(e)=>{this.onUpdateName(category.id,category.name)}}>修改名称</a>
                    {
                        category.parentId==0?<Link to={`/product-category/index/${category.id}`}>查看子品类</Link>:''
                    }
                </td>
            </tr>)
        });
      
        return <div id='page-wrapper'>
          <PageTitle title='品类列表'>
            <div className='page-header-right'><Link to='/product-category/add' className='btn btn-primary'><i className='fa fa-plus'></i> 添加品类</Link></div>
          </PageTitle>
          <div className="row">
                <div className='col-md-12'>
                   <p>父品类ID:{this.state.parentCategoryId}</p>
                </div>
            </div>
            <div className="row">
                <div className='col-md-12'>
                        <TableList tableHeads={['品类D','品类名称','操作']}>
                            {listBody}
                        </TableList>
                </div>
            </div>
        </div>
    }
}

export default CategoryList;