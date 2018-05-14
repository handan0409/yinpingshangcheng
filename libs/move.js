function move(dom,json,callback){
	for(var i in dom.timer){
		clearInterval(dom.timer[i]);
	}
	dom.timer = {};//定时器组;
	for(let attr in json){
		dom.timer[attr] = setInterval(function(){
		 	if(attr == "opacity"){
		 		var iNow = parseInt(getStyle(dom,attr) * 100);
		 	}else{
		 		var iNow = parseInt(getStyle(dom,attr));
		 	}
		 	var speed = (json[attr] - iNow) / 6;

		 	speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

		 	//终止运动;
		 	if(iNow == json[attr]){
		 		clearInterval(dom.timer[attr]);

		 		//判定所有运动终止;
		 		delete dom.timer[attr];
		 		//console.log(dom.timer);
		 		var index = 0;
		 		for(var i in dom.timer){
		 			index ++;
		 		}
		 		if(index == 0){
		 			//所有属性执行完成;
		 			//alert(1);
		 			if(callback){
		 				callback();
		 			}
		 		}

		 	}else{
		 		if(attr == "opacity"){
		 			dom.style.opacity = (iNow + speed ) / 100 ;
		 		}else{
		 			dom.style[attr] = iNow + speed + "px";
		 		}
		 	}
		},50);	
	}
}
function getStyle(DOM,name){
	//IE方法currentStyle
	if(DOM.currentStyle){
		//IE方法获非行间样式
		return DOM.currentStyle[name]
	}else{
		//非IE方法获非行间样式
		return getComputedStyle(DOM,false)[name]
	}
}