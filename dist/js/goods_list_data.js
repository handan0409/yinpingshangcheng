define([
    'jquery'
],function(){
    function GoodsData(){
        
    }
    GoodsData.prototype = {
        constructor:GoodsData,
        init:function(url){
            this.url = url;
            this.loading()
            .then(function(res){
                this.json = res;
                this.render();
            }.bind(this));
        },
        loading:function(){
            this.pot={
                url:this.url,
                dataType:"json",
                type:"GET"
            }
            return $.ajax(this.pot);
        },
        render:function(){
            var html='';
            this.json.data.forEach(function(item){
                html+=`<li>
                            <a href="">
                                <div class="img">
                                    <p>
                                        <img src="${item.img}" alt="">
                                    </p>
                                    <span>`;
                                    item.small_img.forEach(function(item_img,index){
                                        if(index==0){
                                            html+=`<i class="active">
                                                    <img src="${item_img.url}" alt="">
                                                </i>`;
                                        }else{
                                            html+=`<i>
                                                    <img src="${item_img.url}" alt="">
                                                </i>`;
                                        }
                                    });
                                html+=`    
                                    </span>
                                </div>
                                <div class="money">￥${item.monty}</div>
                                <div class="goods_name clamp2">${item.title}</div>
                                <div class="zan">
                                    <span>
                                        <img src="images/liuyan.png" alt="">
                                        <em>${item.liuyan}</em>
                                    </span>
                                    <span>
                                        <img src="images/zan.png" alt="">
                                        <em>${item.zan}</em>
                                    </span>
                                </div>
                            </a>
                            <div class="shoop_car clear">
                                <div class="shu">
                                    <p>1</p>
                                    <i class="jia"></i>
                                    <i class="jian"></i>
                                </div>
                                <button data-id="${item.data}">加入购物车</button>
                                <div class="house">
                                    <i></i>
                                    <span>收藏</span>
                                </div>
                            </div>
                        </li>`;
            });

            $("#main_data").html(html);
        }
    }
    return new GoodsData();
});