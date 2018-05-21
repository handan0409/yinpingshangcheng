;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    $.fn.nav = function(){
        this
        .on("mouseenter",function(){
            $(this).children("ul")
            .stop()
            .fadeIn()
            .end()
            .siblings()
            .children("ul")
            .stop()
            .fadeOut()
        });
        this
        .on("mouseleave",function(){
            $(this).children("ul").stop().fadeOut();
        });
    }
});