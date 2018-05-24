
//添加购物车模块
define(['sumcar','getcar','cookie'],function(sumcar,getcar){
    function Shoop_car(){

    }
    Shoop_car.prototype = {
        constructor:Shoop_car,
        init(main_ele,btn_ele){
            this.main_ele = $(main_ele);
            this.btn_ele = $(btn_ele);
            this.main_ele.on("click",btn_ele,$.proxy(this.addcookie,this));
        },
        //添加cookie
        addcookie(event){
            var evt = event||window.event;
            var target = evt.target||wvt.srcElement;
            var goodsid = $(target).data("id");
            var num = $(target).parents(".shoop_car").find(".shu p").html();
            //如果数据库没有这条cookie
            if(!$.cookie("shopcar")){
                var shopcarArray = [
                    {
                        "id":goodsid,
                        "num":parseInt(num)
                    }
                ]
                $.cookie("shopcar",JSON.stringify(shopcarArray));
                return;
            }
            //如果数据库有购物车的cookie
            var hasItem = true;//判断cookie的购物车中是否有id为goodsid的商品
            var shopcarString = $.cookie("shopcar");
            var shopcarArray = JSON.parse(shopcarString);
            shopcarArray.forEach(function(item){
                if(item.id==goodsid){
                    item.num+=parseInt(num);
                    hasItem = false;
                }
            });
            //hasitem为true说明购物车cookie里面没有id为goodsid的这个商品
            if(hasItem){
                var good = {
                    id:goodsid,
                    num:parseInt(num)
                }
                shopcarArray.push(good);
            }
            $.cookie("shopcar",JSON.stringify(shopcarArray));

            //改变页面上购物车的显示的数量
            // console.log($.cookie("shopcar"));
            sumcar.init("#shopCarNum");
            
            //重新渲染购物车页面
            getcar.init("#carPop");
        },
        
    }

    return new Shoop_car();
});