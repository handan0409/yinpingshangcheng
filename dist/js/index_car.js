define(["jquery"],function(){
    function Index_car(){

    }
    //需求，鼠标点击一个东西,让另一个东西出来right_shopCar
    Index_car.prototype = {
        constructor:Index_car,
        init:function(btn,btn2,content){
            this.btn = $(btn);
            this.btn2 = $(btn2);
            this.dom = $(content);
            this.flag = true;
            this.btn.on("click",$.proxy(this.show_ele,this));
            this.btn2.on("click",$.proxy(this.show_ele,this));
        },
        show_ele(){
            if(this.flag){
                this.dom
                .css("right","-270px")
                .animate({
                    right:0
                });
                this.flag = false;
            }else{
                this.dom
                .css("right","0")
                .animate({
                    right:"-270px"
                });
                this.flag = true;
            }
            
        }
    }

    return new Index_car();
});