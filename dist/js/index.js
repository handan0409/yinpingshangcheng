

define(["jquery","nav","banner","move","index_car","nav_2"],function(jq,nav,banner,move,car,nav_2){
    //这是导航右边的的小轮播图
    var btn_top = ".header_nav .right_img .top_btn";
    var btn_bom = ".header_nav .right_img .bottom_btn";
    var img_ele = ".header_nav .right_img .img_box";
    move.init(btn_top,btn_bom,img_ele);
    //这是右边的购物车的弹出层
    console.log(car);
    car.init(".bar_left ul li .car","#right_shopCar");
    //这个是导航条的内容
    $(".header_top .ul_right>li").nav();
}); 