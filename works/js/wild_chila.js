page();
music();
page1_down();
page2bus();
page4_house();
page5_jugde();
page6_content();
	
function page(){
	var content = document.querySelector(".content");
	// var page1_circle = document.querySelector(".page1_circle img");
	// var page1_font = document.querySelector(".page1_font img");
	// var page1_btn = document.querySelector(".page1_btn img");
	// var page3_font = document.querySelectorAll(".page3_font img");
	// var page3_circle = document.querySelector(".page3_circle");
	// var page6_content = document.querySelectorAll(".page6_content img");
	var startY,moveY,endY,index=0,height=100;
	
	content.addEventListener("touchstart",function(e){
		startY = e.changedTouches[0].pageY;
		index = getdom(e.target).slice(-1);
	});
	
	content.addEventListener("touchmove",function(e){
		
	});
	
	content.addEventListener("touchend",function(e){
		endY = e.changedTouches[0].pageY;
		moveY = endY - startY;
		
		if(Math.abs(moveY) > 200){
			if(moveY > 0){		
				if(index == 1 || !index){
					return;
				}
				content.style.transform = 'translateY('+(2-index)*height+'vh)';
				content.style.transition = 'all 1s ease-in-out';
			}
			else if(moveY < 0){
				if(index == 6 || !index || index == 1 || index == 5){
					return;
				}
				
				content.style.transform = 'translateY(-'+index*height+'vh)';
				content.style.transition = 'all 1s ease-in-out';
			}
		}
	});
	
	function getdom(dom){
		if(dom.className == 'page'){
			return dom.id;
		}
		else{
			return getdom(dom.parentNode);
		}
	}
}


function music(){
	var music_img = document.querySelector(".music_img");
	var my_audio = document.getElementById("my_audio");
		
	music_img.addEventListener("click",function(){
		if(my_audio.paused){
			music_img.style.animation = 'music 2s infinite linear';
			my_audio.play();
		}else{
			my_audio.pause();
			music_img.style.animationPlayState = 'paused';
		}
	})
}

function page1_down(){
	var page1_btn = document.querySelector(".page1_btn");
	var content = document.querySelector(".content");
	page1_btn.addEventListener("click",function(){
		content.style.transform = 'translateY(-100vh)';
	})
}

function page2bus(){
	var content = document.querySelector(".content");
	var page2_content = document.querySelector(".page2_content");
	var page2_font = document.querySelectorAll(".page2_font span");
	var page2_bus = document.querySelector(".page2_bus img");
	
	page2_bus.addEventListener("touchstart",function(e){
		var ev = e||window.event;
		var touch = ev.targetTouches[0];
		nowX = touch.clientX - page2_bus.offsetLeft;
	});
	page2_bus.addEventListener("touchmove",function(e){
		var ev = e||window.event;
		var touch = ev.targetTouches[0];
		var newX = touch.clientX - nowX;
		if(newX >= 360){
			content.style.transform = 'translateY(-200vh)';
			page2_content.style.transform = 'translateX(0)';
			page2_bus.style.left = '0';
			newX = 360;
		}
		if(newX < 0){
			newX = 0;
		}
		page2_content.style.transform = 'translateX(-'+newX+'px)';
		page2_bus.style.left = (newX-30) + 'px';
		
		if(newX<180 && newX>100){
			page2_font[0].style.display = 'block';
		}
		else{
			 page2_font[0].style.display = 'none';
		 }
		if(newX<333 && newX>250){
			page2_font[1].style.display = 'block';
		}
		else{
		 	page2_font[1].style.display = 'none';
		}
	});
}

function page4_house(){
	var content = document.querySelector(".content");
	var page4_mast = document.querySelector(".page4_mast");
	var house_img = page4_mast.querySelectorAll("img");
	var page4_house = document.querySelectorAll(".page4_house img");
	
	page4_mast.addEventListener("click",function(){
		page4_mast.style.animationPlayState = 'paused';
		page4_house[0].style.display = 'none';
		house_img[1].style.transform = 'translateY(280px)';
		house_img[1].style.transition = 'all 1s ease-in-out';
		var timer = setTimeout(function(){
			content.style.transform = 'translateY(-400vh)';
		},2000)
	})
}

function page5_jugde(){
	var content = document.querySelector(".content");
	var page5_content = document.querySelectorAll(".page5_content img");
	var page5_btn = document.querySelectorAll(".page5_btn button");
	var page5_text = document.querySelector(".page5_text span");
	var str = "美丽中国",num="",text,pointer="";
	
	page5_content[0].addEventListener("click",function(){
		text = "国";
		if(num.length == 4){
			return;
		}
		num += text;
		jugde(num);
	})
	page5_content[1].addEventListener("click",function(){
		text = "美";
		if(num.length == 4){
			return;
		}
		num += text;
		jugde(num);
	})
	page5_content[2].addEventListener("click",function(){
		text = "中";
		if(num.length == 4){
			return;
		}
		num += text;
		jugde(num);
	})
	page5_content[3].addEventListener("click",function(){
		text = "丽";
		if(num.length == 4){
			return;
		}
		num += text;
		jugde(num);
	})
	
	function jugde(num){
		if(pointer.length != 4){
			pointer = pointer + "*";
		}
		page5_text.innerText = pointer;
	}
	
	page5_btn[1].addEventListener("click",function(){
		if(num === str){
			content.style.transform = 'translateY(-500vh)';
			page5_text.innerText = '';
			num = pointer = "";
			return false;
		}
		else{
			page5_text.innerText = "输入错误!!!";
			num = pointer = "";	
			return false;
		}
	})
	
	page5_btn[0].addEventListener("click",function(){
		num = pointer = "";			
		page5_text.innerText = "";
	})
}




function page6_content(){
	var content_a = document.querySelector(".page6_content a");
	var str = "点赞中国",i=timer=0;
	typer();
	function typer(){
		if(i < str.length){
			content_a.innerText = str.slice(0,i++) + '|';
			timer = setTimeout(typer, 500);
		}
		else{
			content_a.innerText = str;
			clearTimeout(timer);
		}
	}	
		
}