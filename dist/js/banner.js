//banner模块
define(["jquery","jquery_banner"],function(jq){
    $("#banner").hdBanner(".hd-banner-wrapper",{
        navigation: {
            nextEl: '.hd-button-next',
            prevEl: '.hd-button-prev',
        },
        pagination:{
            el:".hd-banner-pagination"
        },
        direction:"fade",
        loop:true
    });
});