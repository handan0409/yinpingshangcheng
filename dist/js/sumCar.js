define([
    'jquery',
    'cookie'
], function() {
    function SumCar(){

    }
    SumCar.prototype = {
        constructor:SumCar,
        init(sumCar){
            this.sumCar = $(sumCar);
            this.changeNum();
        },
        //改变购物车的数量
        changeNum(){
            var sum_json = this.getSum();
            this.sumCar.html(sum_json._sum);
            $("#type_sum").html(sum_json._type_sum);
            // $("#sum_monty").html(sum_json._sum_monty.toFixed(2));
        },
        //计算购物车数量
        getSum(){
            var shopcarString = $.cookie("shopcar");
            if(!shopcarString)return;
            var shopcarArray = JSON.parse(shopcarString);
            var sum = 0;  //计算共有多少件商品
            var type_sum = 0;  //计算多少种商品
            // var sum_monty = 0;  //就是共有多少钱 放到了getcar里面去计算，这个拿不到monty这个值
            if(shopcarArray){
                shopcarArray.forEach(function(item){
                    sum += item.num;
                    type_sum+=1;
                    // sum_monty += item.monty*item.num;
                });
            }
            return {
                _sum:sum,
                _type_sum:type_sum
            };
        }
    }

    return new SumCar();
    
});