import MUtil from 'util/mm.jsx';
let _mm = new MUtil();
class Order {
    getOrderList(listParam) {
        let url = '',
            data = {};
        if (listParam.listType == 'list') {
            url = '/manage/order/list.do'
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType == 'search') {
            url = '/manage/order/search.do'
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo
        }
        return _mm.request({type: 'post', url: url, data: data})
    }
    //订单详情
    getOrderDetail(orderNumber){
      return  _mm.request({
            type: 'post',
             url: '/manage/order/detail.do',
              data: {
                  orderNo:orderNumber
              }
        })
    }

        //订单详情
        sendGoods(orderNumber){
            return  _mm.request({
                  type: 'post',
                   url: '/manage/order/send_goods.do',
                    data: {
                        orderNo:orderNumber
                    }
              })
          }
}

export default Order;