

define(["jquery","nav","banner","move","index_car","nav_2",'cookie'],function(jq,nav,banner,move,car,nav_2,cookie){
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

    //取cookie里面的用户名
    var username = $.cookie("user");
    if(username){
        $(".login_2")
        .html("欢迎您！<a href=''>"+username+"</a>")
        .show();
        $(".login_1").hide();
    }
}); 