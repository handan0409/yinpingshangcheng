
define([
    "jquery",
    "nav",
    "banner",
    "move",
    "index_car",
    "nav_2",
    'cookie',
    "addcar",
    "getcar", //渲染购物车数据
    'sumcar',
    "search_data" //加载搜索框中的数据
],function(jq,nav,banner,move,car,nav_2,cookie,addcar,getcar,sumcar,search_data){
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

    //加入购物车
    addcar.init("#main_data",'.shoop_car button');

    //渲染购物车数据
    getcar.init("#carPop");

    //查询购物车商品总数量
    sumcar.init("#shopCarNum");

    //加载搜索框下面的文字信息
    search_data.init(
        "https://www.ingping.com/search/hotKeyWords?defaultKey=NAVIGATION_RECOMMEND&hotKey=CUSTOMIZE_KEYWORDS&m=1526979444826&_=1526979443402",
        ".header_middle .search .link"
    );
}); 