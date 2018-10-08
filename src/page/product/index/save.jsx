import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx';
import Product from 'server/product-service.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';

import FileUploader from 'util/file-uploader/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'
import './save.scss'
let _mm = new MUtil();
let _product = new Product();


class ProductSave extends React.Component {
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
                res.defaultDetail=res.detail;   
                this.setState(res);     //这里如果直接使用detail的话，每次输入就会刷新 detail 然后输入组件的默认值又是this.props..又会去更新。  所以
                                        //更新值之前换个字段储存。   当组件值更新时又会触发onvaluechanged 更新this.state 然后又去刷新组件上的props.记得同值判断
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }
    }

    //品类选择器变化
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId:categoryId,
            parentCategoryId:parentCategoryId
        })
    }

    //  上传成功
    onUploadSuccess(res){
        let subImages=this.state.subImages;
        subImages.push(res)
        this.setState({
            subImages:subImages
        },()=>{
            console.log(this.state.subImages)
        })
        
        
    }

    // 上传失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }

    //删除图片
    onImageDelete(e){
        let index=e.target.getAttribute('index'),subImages=this.state.subImages;
        debugger
        subImages.splice(index,1);
        this.setState({
            subImages:subImages
        })

    }

    onDetailValueChange(value){
        this.setState({
            detail:value
        })
    }

    onValueChange(e){
        let name=e.target.name,value=e.target.value.trim();
        this.setState({
            [name]:value
        })
    }

    getSubImagesString(){
        return this.state.subImages.map(image=>image.uri)
    }
    //提交表单
    onSubmit(e){
        let product={
            name:this.state.name,
            subtitle:this.state.subtitle,
            categoryId:parseInt(this.state.categoryId),
            detail:this.state.detail,
            subImages:this.getSubImagesString().join(','),
            price:parseFloat(this.state.price),
            stock:parseInt(this.state.stock),
            status:this.state.status,
        }
        let productCheckResult=_product.checkProduct(product);
        if(this.state.id){
            product.id=this.state.id;
        }
        if(productCheckResult.status){ //表单验证
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product/index')
            },(errMsg)=>{
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(productCheckResult.msg);
        }
    }

    render() {
        return <div id='page-wrapper'>
            <PageTitle title={this.state.id?'编辑商品':'添加商品'}/>
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-md-2 control-label">商品名称</label>
                    <div className="col-md-5">
                        <input name='name' value={this.state.name||''} onChange={(e)=>{this.onValueChange(e)}} type="text" className="form-control" placeholder="请输入商品名称"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品描述</label>
                    <div className="col-md-5">
                        <input name='subtitle' value={this.state.subtitle||''} onChange={(e)=>{this.onValueChange(e)}} type="text" className="form-control" placeholder="请输入商品描述"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">所属分类</label>
                    <CategorySelector
                     categoryId={this.state.categoryId}
                     parentCategoryId={this.state.parentCategoryId}
                     onCategoryChange={(categoryId,parentCategoryId)=>{
                        this.setState({
                            categoryId:categoryId,
                            parentCategoryId:parentCategoryId
                        })
                    }}/>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品价格</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input name='price' value={this.state.price} onChange={(e)=>{this.onValueChange(e)}} type="number" className="form-control" placeholder="价格"/>
                            <span className="input-group-addon" id="basic-addon2">元</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品库存</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input name='stock' value={this.state.stock} onChange={(e)=>{this.onValueChange(e)}} type="number" className="form-control" placeholder="库存"/>
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
                                <i className='fa fa-close' data-index={index} index={index} onClick={(e)=>{this.onImageDelete(e)}}></i>
                            </div>
                        }):'（请上传照片）'
                        }
                    </div>
                    <div className="col-md-offset-2 col-md-10 file-upload-con">
                        <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}} onError={(res)=>{this.onUploadError(res)}}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">商品详情</label>
                    <div className="col-md-10">
                        <RichEditor defaultDetail={this.state.defaultDetail} detail={this.state.detail} onValueChange={(value)=>{this.onDetailValueChange(value)}}/>
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

export default ProductSave;