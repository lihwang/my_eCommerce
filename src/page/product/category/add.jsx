import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'server/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx'

let _mm=new MUtil();
let _product=new Product();

class CategoryAdd extends React.Component {
    constructor(props){
        super(props);
        this.state={
            categoryList:[],
            parentId:0,
            categoryName:''
        }
    }

    componentDidMount(){
        this.loadCategoryList();
    }
   
    //显示父品类
    loadCategoryList(){
        _product.getCategoryList().then(res=>{
            this.setState({
                categoryList:res
            });
        },(errMsg)=>{
            this.setState({
                categoryList:[]
            })
        _mm.errorTips(errMsg)
        })
    }
    //表单值的变化
    onValueChange(e){
        let name=e.target.name,value=e.target.value;
        this.setState({
            [name]:value
        })
    }

    onSubmit(e){
        let categoryName=this.state.categoryName.trim();
        //品类名称不为空
        if(categoryName){
            _product.saveCategory({
                parentId:this.state.parentId,
                categoryName:categoryName
            }).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips('请输入品类名称!');
        }
    }
 
 
    render() {
        return <div id='page-wrapper'>
          <PageTitle title='品类列表'></PageTitle>
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">所属品类</label>
                    <div className="col-md-5">
                        <select name='parentId' value={this.state.parentId||''} className='form-control' onChange={(e)=>{this.onValueChange(e)}}>
                            <option value='0'>根品类/</option>
                            {this.state.categoryList.map((category,index)=>{
                                return <option  value={category.id} key={index}>根品类/{category.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">品类名称</label>
                    <div className="col-md-5">
                        <input name='categoryName' value={this.state.categoryName||''} onChange={(e)=>{this.onValueChange(e)}} type="text" className="form-control" placeholder="请输入商品描述"/>
                </div>
                </div>
                <div className="form-group">
                        <div className="col-md-offset-2 col-md-5">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>{this.onSubmit(e)}}>提交</button>
                        </div>
                </div>
            </div>
        </div>
    }
}

export default CategoryAdd;