load();
page2_down();
page3_down();
music();
page();
list();

function load(){
	var page1_load = document.querySelector(".page1_load div");
	var content = document.querySelector(".content");
	var page1_num = document.querySelector(".page1_num");
	var timer1,time2,str='',num=0;
	
	timer1 = setInterval(function(){
		str = str + ".";
		page1_load.innerText = str;
		if(str.length >= 3){
			str = "";
		}
	},500)
	
	timer2 = setInterval(function(){
		num++;
		page1_num.innerText = num + '%';
		if(num == 100){
			clearInterval(timer1)
			content.style.transform = 'translateY(-100vh)';
			content.style.transition = 'all 1s ease-in-out';
			clearInterval(timer2)
		}
	},20)
}

function page2_down(){
	var page2_down = document.querySelector(".page2_down");
	var content = document.querySelector(".content");
	page2_down.addEventListener("click",function(){
		content.style.transform = 'translateY(-200vh)';
		content.style.transition = 'all 1s ease-in-out';
	})
}

function page3_down(){
	var page3_down = document.querySelector(".page3_down");
	var content = document.querySelector(".content");
	page3_down.addEventListener("click",function(){
		content.style.transform = 'translateY(-300vh)';
		content.style.transition = 'all 1s ease-in-out';
	})
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

function page(){
	var content = document.querySelector(".content");
	var startY,moveY,endY,index=0,height=100;
	
	content.addEventListener("touchstart",function(e){
		startY = e.changedTouches[0].pageY;
		index = getdom(e.target).slice(-1);
	})
	
	content.addEventListener("touchmove",function(e){
		
	})
	
	content.addEventListener("touchend",function(e){
		endY = e.changedTouches[0].pageY;
		moveY = endY - startY;
		
		if(Math.abs(moveY) > 200){
			if(moveY > 0){		//上一页
				if(index == 2 || !index){
					return;
				}
				content.style.transform = 'translateY('+(2-index)*height+'vh)';
				content.style.transition = 'all 1s ease-in-out';
			}
			else if(moveY < 0){
				if(index == 4 || !index){
					return;
				}
				content.style.transform = 'translateY(-'+index*height+'vh)';
				content.style.transition = 'all 1s ease-in-out';
			}
		}
	})
}

function list(){
	var page3_fontimg = document.querySelectorAll(".page3_fontimg img");
	var page3_img = document.querySelectorAll(".page3_img img");
	var page3_font = document.querySelectorAll(".page3_font img");
	
	
	for(var i=0;i<page3_font.length;i++){
		page3_img[i].index = i;
		page3_img[i].addEventListener('click',function(){
			for(var j=0;j<page3_font.length;j++){
				page3_font[j].style.display = 'none';
				page3_img[j].style.boxShadow = 'none';
				page3_fontimg[j].style.display = 'none';
			}
			i = this.index;
			page3_fontimg[i].style.display = 'block';
			page3_font[i].style.display = 'block';
			page3_img[i].style.boxShadow = '0 0 2px 1px #D58512';
		})
	}
}

function getdom(dom){
	if(dom.className == 'page'){
		return dom.id;
	}
	else{
		return getdom(dom.parentNode);
	}
}
