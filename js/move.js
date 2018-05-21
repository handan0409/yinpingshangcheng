
define(["jquery"],function($){
    function Move(){
        
    }
    Move.prototype = {
        constructor:Move,
        init:function(btnTop,btnBom,imgBox_ele){
            this.btnTop = $(btnTop);
            this.btnBom = $(btnBom);
            this.imgBox_ele = $(imgBox_ele);
            this.img_ele = this.imgBox_ele.children();
            //图片下标
            this.index = 0;

            this.loop();
            this.btnTop
            .on("click.change_index",{turn:"top"},$.proxy(this.chnange_index,this))
            .on("click.move",{dire:"bntTop"},$.proxy(this.move,this));
            this.btnBom
            .on("click.change_index",{turn:"bottom"},$.proxy(this.chnange_index,this))
            .on("click.move",{dire:"btnBottm"},$.proxy(this.move,this));
        },
        //计算图片下标
        chnange_index:function(event){
            var turnList = {
                "top":function(){
                    this.prev = this.index;
                    if(this.index<=0){
                        this.index=this.img_ele.length-1;
                    }else{
                        this.index--;
                    }
                }.bind(this),
                "bottom":function(){
                    this.prev = this.index;
                    if(this.index>=this.img_ele.length-1){
                        this.index = 0;
                    }else{
                        this.index++;
                    }
                }.bind(this)
            };
            turnList[event.data.turn]();
        },
        move:function(event){
            //得判断点击的是btnLeft,还是btnRight
            var scrollList = {
                bntTop:function(){
                    //初始化
                    this.img_ele
                    .css("z-index","")
                    .eq(this.prev).css("z-index","2")
                    .end()
                    .eq(this.index).css("z-index","2");

                    this.img_ele.eq(this.prev)
                    .css("top",0)
                    .stop()
                    .animate({
                        top:this.img_ele.outerHeight()
                    })
                    .end()
                    .eq(this.index)
                    .css("top",-this.img_ele.outerHeight())
                    .stop()
                    .animate({
                        top:0
                    })
                }.bind(this),
                btnBottm:function(){
                    //初始化
                    this.img_ele
                    .css("z-index","")
                    .eq(this.prev).css("z-index","2")
                    .end()
                    .eq(this.index).css("z-index","2");

                    this.img_ele.eq(this.prev)
                    .css("top",0)
                    .stop()
                    .animate({
                        top:-this.img_ele.outerHeight()
                    })
                    .end()
                    .eq(this.index)
                    .css("top",this.img_ele.outerHeight())
                    .stop()
                    .animate({
                        top:0
                    })
                }.bind(this)
            }
            scrollList[event.data.dire]();
        },
        loop:function(){
            $(".right_img").on("mouseenter",function(){
                clearInterval(this.loopTimer);
            }.bind(this))
            $(".right_img").on("mouseleave",function(){
                clearInterval(this.loopTimer);
                this.loopTimer = setInterval(function(){
                    this.prev = this.index;
                    this.index = ++this.index  % this.img_ele.length;
                    //如果是scroll类型的，自动往左轮播，相当于点右边的按钮
                    this.move({data:{dire:"btnBottm"}});
                }.bind(this),1000);
            }.bind(this))
            $(".right_img").trigger("mouseleave")
        }
    }

    return new Move();
}); 

