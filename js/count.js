
//计算购买数量模块
define(['jquery'],function(){
    function Count(){

    }
    Count.prototype = {
        constructor:Count,
        init(main_data,jia_ele,jian_ele){
            this.main_data = $(main_data);
            this.main_data.on("click",jia_ele,$.proxy(this.addNum,this));
            this.main_data.on("click",jian_ele,$.proxy(this.redNum,this));
        },
        //点击加号
        addNum(event){
            var evt = event||window.event;
            var target = evt.target||evt.srcElement;
            var $num_ele = $(target).parents(".shu").find("p");
            var num = $num_ele.html();
            $num_ele.html(++num);
        },
        //点击减号
        redNum(event){
            var evt = event||window.event;
            var target = evt.target||evt.srcElement;
            var $num_ele = $(target).parents(".shu").find("p");
            var num = $num_ele.html();
            if(num>1){
                $num_ele.html(--num);
            }
        }
    }

    return new Count();
});