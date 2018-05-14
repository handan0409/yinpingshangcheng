/**
 * Created by Administrator on 2018/5/10.
 */
$(function(){
    //全部商品的导航详情显示与隐藏
    $(".class_cont li").mouseenter(function(){
        $(".class_all_details").show();
    });
    $(".class_cont li").mouseleave(function(){
        $(".class_all_details").hide();
        $(".class_all_details").mouseenter(function(){
            $(this).show();
        });
        $(".class_all_details").mouseleave(function(){
            $(this).hide();
        });
    });
});