import MUtil from 'util/mm.jsx';
let _mm=new MUtil();
class Product{
    getProductList(listParam){
        let url='',data={};
        if(listParam.listType=='list'){
            url='/manage/product/list.do'
            data.pageNum=listParam.pageNum;
        }else if(listParam.listType=='search'){
            url='/manage/product/search.do'
            data.pageNum=listParam.pageNum;
            data[listParam.searchType]=listParam.keyword
        }
        return _mm.request({
            type:'post',
            url:url,
            data:data
        })
    }
    //变更销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type:'post',
            url:'/manage/product/set_sale_status.do',
            data:productInfo
        })
        
    }

    //品类相关 添加
    getCategoryList(parentCategoryId){
        return _mm.request({
            type:'post',
            url:'/manage/category/get_category.do',
            data:{
                categoryId:parentCategoryId||0
            }
        })
    }

    //检查保存商品表单
    checkProduct(product){
        let result={
            status:true,
            msg:'验证通过'
        }
        console.log(product)
        if(typeof product.name!=='string' ||product.name.length===0){
            return {
                status:false,
                msg:'商品名称不能为空'
            }
        }
        if(typeof product.subtitle!=='string' ||product.subtitle.length===0){
            return {
                status:false,
                msg:'商品描述不能为空'
            }
        }
        if(typeof product.categoryId!=='number' ||!(product.categoryId>0)){
            return {
                status:false,
                msg:'请选择商品品类'
            }
        }
        //商品价格为数字大于0
        if(typeof product.price!=='number' ||!(product.price>=0)){
            return {
                status:false,
                msg:'请输入正确的商品价格！'
            }
        }
        //库存数字为数字且大于等于0
        if(typeof product.stock!=='number' ||!(product.stock>=0)){
            return {
                status:false,
                msg:'请输入正确的库存数量！'
            }
        }
        return result;

    }

    //保存商品
    saveProduct(product){
        return _mm.request({
            type:'post',
            url:'/manage/product/save.do',
            data:product
        })
    }

    //获取商品详情
    getProduct(id){
        return _mm.request({
            type:'post',
            url:'/manage/product/detail.do',
            data:{
                productId:id||0
            }
        })
    }
}
  
export default Product;