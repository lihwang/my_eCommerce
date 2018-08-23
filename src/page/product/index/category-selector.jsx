import React from 'react';
import './category-selector.scss'

import MUtil from 'util/mm.jsx';
import Product from 'server/product-service.jsx';

let _mm=new MUtil();
let _product=new Product();

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryId:0,
            secondCategoryList:[]
        }
    }

    componentDidMount(){
        this.loadFirstCategory();
    }

    componentWillReceiveProps(nextProps){
        let categoryIdChange=(this.props.categoryId!==nextProps.categoryId),
         parentCategoryIdChange=(this.props.parentCategoryId!==nextProps.parentCategoryId);
         if(!categoryIdChange && !categoryIdChange){
             return ;
         }
         //假如只有一级品类
         if(nextProps.parentCategoryIdChange==0){
             this.setState({
                firstCategoryId:nextProps.categoryId,
                secondCategoryId:0
             })
         }else{
            this.setState({
                firstCategoryId:nextProps.parentCategoryId,
                secondCategoryId:nextProps.categoryId,
             },()=>{
                parentCategoryIdChange && this.loadSecondCategory ();
             })
         }

    }

    //一级分类
    loadFirstCategory(){
        _product.getCategoryList().then((res)=>{
            this.setState({
                firstCategoryList:res
            })
        },(errMsg)=>{
            _mm.errorTips(errMsg);
        })
    }

    //二级分类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then((res)=>{
            this.setState({
                secondCategoryList:res
            })
        },(errMsg)=>{
            _mm.errorTips(errMsg);
        })
    }

    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue=e.target.value||0;
        this.setState({ //异步操作
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]
        },()=>{
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }

    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return;
        }
        let newValue=e.target.value||0;
        this.setState({ //异步操作
            secondCategoryId:newValue,
        },()=>{
            this.onPropsCategoryChange();
        })
    }

    //传给父类结果（1和2级只会有一个传出去）
    onPropsCategoryChange(){
        //是否props有此函数不
        let categoryChangeable= typeof this.props.onCategoryChange ==='function';
        if(this.state.secondCategoryId){//二级品类
            categoryChangeable&&this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }else{
            categoryChangeable&&this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }

    render() {
        return <div className="col-md-10">
        <select readOnly={this.props.readOnly} value={this.state.firstCategoryId} onChange={(e)=>{this.onFirstCategoryChange(e)}} className="form-control cate-select">
            <option value="">请选择一级分类</option>
            {
                this.state.firstCategoryList.map((item,index)=>{
                    return <option key={index} value={item.id}>{item.name}</option>
                })
            }
        </select>
        {
            this.state.secondCategoryList.length?
            <select readOnly={this.props.readOnly}  value={this.state.secondCategoryId} onChange={(e)=>{this.onSecondCategoryChange(e)}} className="form-control cate-select">
                <option value="">请选择二级分类</option>
                {
                    this.state.secondCategoryList.map((item,index)=>{
                        return <option key={index} value={item.id}>{item.name}</option>
                    })
                }
            </select>:null
        }
    </div>
    }
}

export default CategorySelector;