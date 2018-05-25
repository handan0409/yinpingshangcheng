define(["jquery"],function(){
    function MagnifierNarrow(){
        
    }
    MagnifierNarrow.prototype = {
        constructor:MagnifierNarrow,
        init(small_img,big_img){
            this.small_img = $(small_img);
            this.big_img = $(big_img);
            this.small_img.on("mouseenter",$.proxy(this.change,this));
        },
        //切换
        change(event){
            var target = event.target||event.srcElement;
            var index = $(target).parent().index();
            //让小图有边框
            $(target).parent().addClass("active")
            .siblings().removeClass("active");
            //small_img显示
            $(".small_img .img_array img").eq(index)
            .addClass("active")
            .siblings().removeClass("active");
            //大图显示
            $(".big_img img").eq(index)
            .addClass("active")
            .siblings().removeClass("active");
        }
    }
    return new MagnifierNarrow();
});