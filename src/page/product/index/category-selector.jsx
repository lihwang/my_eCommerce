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
        <select onChange={(e)=>{this.onFirstCategoryChange(e)}} className="form-control cate-select">
            <option value="">请选择一级分类</option>
            {
                this.state.firstCategoryList.map((item,index)=>{
                    return <option key={index} value={item.id}>{item.name}</option>
                })
            }
        </select>
        {
            this.state.secondCategoryList.length?
            <select onChange={(e)=>{this.onSecondCategoryChange(e)}} className="form-control cate-select">
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