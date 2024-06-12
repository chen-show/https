girl();

function girl(){
	var layer = document.querySelectorAll(".layer");
	var girl_img = layer[1].querySelector("img");
	
	var timer = setInterval(function(){
		setTimeout(function(){
			girl_img.src = './img/2-zha.png';
		})
		setTimeout(function(){
			girl_img.src = './img/2-bi.png';
		},100)
		setTimeout(function(){
			girl_img.src = './img/2-zha.png';
		},200)
		setTimeout(function(){
			girl_img.src = './img/2.png';
		},300)
	},2000)
	
}

blur();

function blur(){
	var layer = document.querySelectorAll(".layer");
	var girl_img = layer[1].querySelector("img");
	var width = girl_img.offsetWidth;
	var scene_img = layer[2].querySelector("img");
	var startX,moveX,endX;
	scene_img.addEventListener("mouseenter",function(e){
		var ev = e||window.event;
		startX = ev.clientX;
		for(var i=0;i<layer.length;i++){
			layer[i].querySelector("img").style.transition = 'none';
		}
	})
	scene_img.addEventListener("mousemove",function(e){
		var ev = e||window.event;
		endX = ev.clientX;
		moveX = endX - startX;
		var blur_1 = -20*moveX / width;
		girl_img.style.filter = 'blur('+blur_1+'px)';
		
		var blur_2 = 40*moveX / width;
		scene_img.style.filter = 'blur('+blur_2+'px)';
		scene_img.style.transform = 'translateX('+(2*blur_2)+'px)';
	})
	scene_img.addEventListener("mouseleave",function(e){
		for(var i=0;i<layer.length;i++){
			layer[i].querySelector("img").style.transition = 'all 1s ease';
			layer[i].querySelector("img").style.filter = 'blur(4px)';
			layer[i].querySelector("img").style.transform = 'translateX(0)';
		}
		girl_img.style.filter = 'blur(0)';
	})
}