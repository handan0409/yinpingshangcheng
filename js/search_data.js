define([
    'jquery'
], function(jq) {
    function GetSearch(){

    }
    GetSearch.prototype = {
        constructor:GetSearch,
        init(url,ele){
            this.url = url;
            this.ele = $(ele);
            this.loading()
            .then(function(res){
                this.json = res;
                this.render();
            }.bind(this));
        },
        loading(){
            this.pot = {
                url:this.url,
                dataType:"jsonp",
                data:{},
                type:"POST"
            }
            return $.ajax(this.pot);
        },
        render(){
            var inputText = this.json.list.listDefault[0].name;
            $(".header_middle .search .txt").attr("placeholder",inputText);
            var html="";
            this.json.list.listHot.forEach(function(item){
                html+=`<li data-id="${item.id}"><a href="${item.url}">${item.name}</a></li>`;
            });
            this.ele.html(html);
        }
    }

    return new GetSearch();
    
});