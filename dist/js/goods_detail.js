
//商品列表页的模块
define([
    "jquery",
    "nav",
    "move",
    "index_car",
    "nav_2",
    'cookie',
    "addcar",
    "getcar", //渲染购物车数据
    'sumcar',
    "removecar",
    "magnifier",
    "magnifier_narrow",
    "count",
],function(jq,nav,move,car,nav_2,cookie,addcar,getcar,sumcar,removecar,magnifier,MagnifierNarrow,count){
    //这是导航右边的的小轮播图
    var btn_top = ".header_nav .right_img .top_btn";
    var btn_bom = ".header_nav .right_img .bottom_btn";
    var img_ele = ".header_nav .right_img .img_box";
    move.init(btn_top,btn_bom,img_ele);
    //这是右边的购物车的弹出层
    car.init(".bar_left ul li .car","#carPopDelete","#right_shopCar");
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

    //控制全部商品的导航显示
    $(".header_nav .all").on("mouseenter",function(){
        $(this).children(".class_cont").show();
    });
    $(".header_nav .all").on("mouseleave",function(){
        $(this).children(".class_cont").hide();
    });

    //加入购物车
    addcar.init(".infor_right .dev_left",'.button .btn_shop');

    //渲染购物车数据
    getcar.init("#carPop");

    //查询购物车商品总数量
    sumcar.init("#shopCarNum");

    //删除购物车
    $("#carPop").on("click",".delete",function(){
        console.log(1324);
        var goodsid = $(this).data("id");
        removecar.init(goodsid);
    });

    //放大镜
    magnifier.init({
        "small_ele":".infor_left .small_img",
		"focus_ele":".infor_left .grayBox",
		"big_ele":".infor_left .big_img"
    });
    //放大镜的缩略图
    MagnifierNarrow.init(".narrow_img li",".goods_detail_img .small_img img",".goods_detail_img .big_img img");

    //选择规格
    $(".guige .gg_btn p").on("click",function(){
        $(this).addClass("active")
        .siblings().removeClass("active");
    });

    //计算购买商品的数量
    count.init(".infor_right .dev_left",".num_shu .jia",".num_shu .jian");

}); 