import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx';
import Product from 'server/product-service.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';

import './save.scss'
let _mm = new MUtil();
let _product = new Product();


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:this.props.match.params.pid,
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            detail:'',
            name:'',
            subtitle:'',
            price:'',
            stock:'',
            detail:'',
            status:1,//商品状态1在售
        }
    }

    componentDidMount(){
        this.loadProduct();
    }

    loadProduct(){
        if(this.state.id){//有id表单回传
            _product.getProduct(this.state.id).then((res)=>{
                let images=res.subImages.split(',');
                res.subImages=images.map((imguri)=>{
                    return {
                        uri:imguri,
                        url:res.imageHost+imguri
                    }
                })
                this.setState(res);     
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
    }



    getSubImagesString(){
        return this.state.subImages.map(image=>image.uri)
    }

    render() {
        return <div id='page-wrapper'>
            <PageTitle title='添加商品'/>
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">商品名称</label>
                    <div className="col-md-5">
                        <p className="form-control-static">{this.state.name||''}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品描述</label>
                    <div className="col-md-5">
                        <p className="form-control-static">{this.state.subtitle||''}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">所属分类</label>
                    <CategorySelector
                     readOnly
                     categoryId={this.state.categoryId}
                     parentCategoryId={this.state.parentCategoryId}
                     />
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品价格</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input value={this.state.price} readOnly  type="number" className="form-control"/>
                            <span className="input-group-addon" id="basic-addon2">元</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品库存</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input value={this.state.stock} readOnly type="number" className="form-control"/>
                            <span className="input-group-addon" id="basic-addon2">件</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品图片</label>
                    <div className="col-md-10">
                        {this.state.subImages.length?
                        this.state.subImages.map((item,index)=>{
                            return <div key={index} className='img-con'>
                                <img src={item.url}/>
                            </div>
                        }):'（暂无图片）'
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品详情</label>
                    <div className="col-md-10">
                        <div dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
                        {/* <RichEditor defaultDetail={this.state.defaultDetail} detail={this.state.detail} onValueChange={(value)=>{this.onDetailValueChange(value)}}/> */}
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

export default ProductDetail;