//查询cookie中的购物车数量
define(['jquery','cookie'],function(){
    function GetCar(){

    }
    GetCar.prototype = {
        constructor:GetCar,
        init(ele){
            this.ele = $(ele);
            this.url = "data/goods_list.json";
            this.loading()
            .then(function(res){
                this.json = res;
                this.getCookie();
            }.bind(this));
        },
        //取cookie数据,并比对，生成一个新的对象数组
        getCookie(){
            this.carGoods = [];
            var shopCarString = $.cookie("shopcar");
            if(!shopCarString)return this.render();;  //防止报错
            // console.log(this.json.data);
            var shopCarArray = JSON.parse(shopCarString);
            shopCarArray.forEach(function(item){
                this.json.data.forEach(function(goodsAll){
                    if(item.id==goodsAll.id){
                        goodsAll.num = item.num;
                        this.carGoods.push(goodsAll);
                    }
                }.bind(this));
            }.bind(this));
            //生成好了对象数组以后，渲染数据
            this.render();
        },
        //取所有的商品的信息
        loading:function(){
            this.pot={
                url:this.url,
                dataType:"json",
                type:"GET"
            }
            return $.ajax(this.pot);
        },
        //渲染数据,页面中的购物车弹框
        render(){
            var sum_monty=0;//这个计算总价格，
            var html="";
            this.carGoods.forEach(function(item){
                html+=`<li>
                            <a href="">
                                <div class="img"><img src="${item.small_img[0].url}" alt=""/></div>
                                <div class="infor">
                                    <p class="txt clamp2">${item.title}</p>
                                    <p class="jiage"><span>￥${item.monty}</span><i>x${item.num}</i></p>
                                </div>
                            </a>
                            <i class="delete" data-id="${item.id}"><img src="images/delete.png" alt=""/></i>
                        </li>`;
                sum_monty += item.monty*item.num;
            });

            this.ele.html(html);
            $("#sum_monty").html(sum_monty.toFixed(2));
        }
    }

    return new GetCar();
});