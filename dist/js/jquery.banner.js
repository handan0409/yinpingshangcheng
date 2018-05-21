

// 1. 初始化组件;
// 2. 渲染元素;
// 3. 做所有的动画功能;
// 4. 下标处理;

;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    $.fn.hdBanner = function(banner_box,options){
        new Banner(banner_box,options,this);

    }
    //Banner的构造函数
    function Banner(banner_box,options,base_ele){
        //第一步：先选则dom对象
        this.bannerWrapper = $(banner_box);
        //要轮播的图片
        this.bannerItem = $(banner_box).children();
        //传过来的参数对象
        this.options = options;
        //动画模式（默认fade这种模式轮播）
        this.direction = options.direction?options.direction:"fade";
        //记录当前显示的下标
        this.index = 0;
        this.init();
    }
    //banner的函数原型
    Banner.prototype = {
        constructor:Banner,
        init:function(){

            //如果有按钮，为左右两个按钮绑定事件
            if(typeof this.options.navigation == "object"){
                //选择两个按钮
                this.btnPrev = $(this.options.navigation.prevEl);
                this.btnNext = $(this.options.navigation.nextEl);
                //绑定事件(点击改变下标)
                this.btnPrev
                .on("click.change_index",{turn:"prev"},$.proxy(this.change_index,this))
                .on("click.animation",function(){
                    //这个传值主要是给scroll动画用
                    $.proxy(this.animation("btnLeft"),this)
                }.bind(this));  
                this.btnNext
                .on("click.change_index",{turn:"next"},$.proxy(this.change_index,this))
                .on("click.animation",function(){
                    //这个传值主要是给scroll动画用
                    $.proxy(this.animation("btnRight"),this)
                }.bind(this));
            };
            //如果有小圆点，为下边的小圆点绑定事件
                //先判断布局中是否有这些小圆点
            this.pagination = $(this.options.pagination?this.options.pagination.el:"");
            if(this.pagination!==0){
                for(var i=0;i<this.bannerItem.length;i++){
                    var span = $("<span></span>");
                    this.pagination.append(span);
                    if(i==this.index){
                        span.addClass("hd-active");
                    }
                }
                //为小圆点绑定事件
                this.paginationItem = this.pagination.children();
                this.paginationItem.on("mouseenter.change_index",{turn:"toIndex"},$.proxy(this.change_index,this));
                this.paginationItem.on("mouseenter",function(){
                    if(this.index>this.prev){
                        $.proxy(this.animation("btnRight"),this);
                    }else if(this.index<this.prev){
                        $.proxy(this.animation("btnLeft"),this);
                    }
                }.bind(this));
            }   
            //如果有自动轮播，设置自动轮播
            if(this.options.loop){
                this.loop();
            }
        },
        //计算下标的方法
        change_index:function(event){
            //使用策略模式判断点击了哪个按钮
            var turnList = {
                "prev":function(){
                    this.prev = this.index;
                    if(this.index<=0){
                        this.index=this.bannerItem.length-1;
                    }else{
                        this.index--;
                    }
                }.bind(this),
                "next":function(){
                    this.prev = this.index;
                    if(this.index>=this.bannerItem.length-1){
                        this.index = 0;
                    }else{
                        this.index++;
                    }
                }.bind(this),
                "toIndex":function(){
                    this.prev = this.index;
                    this.index = $(event.target).index();
                }.bind(this)
            };
            turnList[event.data.turn]();
        },
        //让图片根据下标做动画
        animation:function(dire){
            //根据策略模式判断使用的是那种动画效果
            var animationList = {
                //渐入渐出轮播效果
                slide:function(){
                   //设置prev的z-Index值，使prev永远在最上边,其他的都在下边
                   animationList.prevInit();
                   this.bannerItem.eq(this.index)
                   .addClass("hd-active")
                   .css("display","none")
                   .slideDown()
                   .siblings()
                   .removeClass("hd-active");
                }.bind(this),
                //淡入淡出的轮播效果
                fade:function(){
                   //设置prev的z-Index值，使prev永远在最上边,其他的都在下边
                   animationList.prevInit();
                   this.bannerItem.eq(this.index)
                   .addClass("hd-active")
                   .css("display","none")
                   .stop()
                   .fadeIn(1000)
                   .siblings()
                   .removeClass("hd-active");
                }.bind(this),
                //这是左右滑动的动画效果
                scroll:function(dire){
                    //得判断点击的是btnLeft,还是btnRight
                    var scrollList = {
                        btnLeft:function(){
                            //初始化
                            this.bannerItem
                            .css("z-index","")
                            .eq(this.prev).css("z-index","2")
                            .end()
                            .eq(this.index).css("z-index","2");

                            this.bannerItem.eq(this.prev)
                            .css("left",0)
                            .stop()
                            .animate({
                                left:this.bannerItem.outerWidth()
                            })
                            .end()
                            .eq(this.index)
                            .css("left",-this.bannerItem.outerWidth())
                            .stop()
                            .animate({
                                left:0
                            })
                        }.bind(this),
                        btnRight:function(){
                            //初始化
                            this.bannerItem
                            .css("z-index","")
                            .eq(this.prev).css("z-index","2")
                            .end()
                            .eq(this.index).css("z-index","2");

                            this.bannerItem.eq(this.prev)
                            .css("left",0)
                            .stop()
                            .animate({
                                left:-this.bannerItem.outerWidth()
                            })
                            .end()
                            .eq(this.index)
                            .css("left",this.bannerItem.outerWidth())
                            .stop()
                            .animate({
                                left:0
                            })
                        }.bind(this)
                    }
                    scrollList[dire]();
                }.bind(this),
                prevInit:function(){
                    this.bannerItem.eq(this.prev)
                    .css("z-index","1")
                    .siblings()
                    .css("z-index","");
                }.bind(this)
            }
            animationList[this.direction](dire);
            //动画执行完成，让下面的小点也随着变
            this.pagination.children().eq(this.index)
            .addClass("hd-active")
            .siblings()
            .removeClass("hd-active");
        },
        //自动轮播的方法
        loop(){
            $(".hd-banner-container").on("mouseenter",function(){
                clearInterval(this.loopTimer);
            }.bind(this))
            $(".hd-banner-container").on("mouseleave",function(){
                clearInterval(this.loopTimer);
                this.loopTimer = setInterval(function(){
                    this.prev = this.index;
                    this.index = ++this.index  % this.bannerItem.length;
                    //如果是scroll类型的，自动往左轮播，相当于点右边的按钮
                    this.animation("btnRight");
                }.bind(this),2000);
            }.bind(this))
            $(".hd-banner-container").trigger("mouseleave")
        }
    }
});
