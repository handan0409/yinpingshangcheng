
define(['jquery','cookie','sumcar','getcar'],function(jq,cookie,sumcar,getcar){
    function removeCar(){

    }
    removeCar.prototype = {
        constructor:removeCar,
        init(goodsid){
            this.goodsid = goodsid;
            this.removeCookie();
        },
        //删除cookie中的某个商品信息
        removeCookie(){
            var goodsid = this.goodsid;
            //如果数据库有购物车的cookie
            var shopcarString = $.cookie("shopcar");
            var shopcarArray = JSON.parse(shopcarString);
            console.log(shopcarArray);
            shopcarArray.forEach(function(item,index){
                if(item.id==goodsid){
                    shopcarArray.splice(index,1);
                }
            });
            $.cookie("shopcar",JSON.stringify(shopcarArray));

            //改变页面上购物车的显示的数量
            // console.log($.cookie("shopcar"));
            sumcar.init("#shopCarNum");
            
            //重新渲染购物车页面
            getcar.init("#carPop");
        },
    }
    return new removeCar();
});