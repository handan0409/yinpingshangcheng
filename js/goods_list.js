
//商品列表页的模块
define([
    "jquery",
    "nav",
    "move",
    "index_car",
    "nav_2",
    'cookie',
    "goods_list_data",
    "count", //计算购买数量模块
    "addcar",
    "getcar", //渲染购物车数据
    'sumcar',
    "removecar"
],function(jq,nav,move,car,nav_2,cookie,data,count,addcar,getcar,sumcar,removecar){
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

    //ajax请求数据
    data.init("data/goods_list.json");

    //商品的大小图切换
    $("#main_data").on("mouseover","li .img i",function(){
        var index = $(this).index();
        $(this)
        .addClass("active")
        .siblings().removeClass("active");
        $(this).parents(".img").find("p img").removeClass("active");
        $(this).parents(".img").find("p img").eq(index).addClass("active");
    });

    //计算购买商品的数量
    count.init("#main_data",".shoop_car .shu .jia",".shoop_car .shu .jian");

    //加入购物车
    addcar.init("#main_data",'.shoop_car button');

    //渲染购物车数据
    getcar.init("#carPop");

    //查询购物车商品总数量
    sumcar.init("#shopCarNum");

    //删除购物车
    $("#carPop").on("click",".delete",function(){
        var goodsid = $(this).data("id");
        removecar.init(goodsid);
    });
    
    
}); 