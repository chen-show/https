

function page1_down(){
	var content = document.querySelector(".content");
	var page2_content = document.querySelectorAll(".page2_content img");
	var page1_border = document.querySelector(".page1_border span");
	var num = 0;
	var timer = setInterval(function(){
		num++;
		page1_border.style.width = num + '%';
		if(num == 100){
			content.style.transform = 'translateX(-100vw)';
			page2_content[0].className = 'page2_img1';
			page2_content[1].className = 'page2_img2';
			page2_content[2].className = 'page2_img3';
			clearInterval(timer);
		}
	},20)
}


function music(){
	var music_img = document.querySelector(".music img");
	var music_audio = document.querySelector(".music audio");
	
	music_img.addEventListener("click",function(){
		if(music_audio.paused){
			music_audio.play();
			music_img.style.animation = 'music 2s infinite linear';
		}
		else{
			music_audio.pause();
			music_img.style.animationPlayState = 'paused';
		}
	})
	
}


function page(){
	var content = document.querySelector(".content");
	var startX,moveX,endX,index;
	
	content.addEventListener("touchstart",function(e){
		var ev = e||window.event;
		startX = ev.changedTouches[0].pageX;
		index = getdom(ev.target).slice(-1);
	})
	content.addEventListener("touchend",function(e){
		var ev = e||window.event;
		endX = ev.changedTouches[0].pageX;
		moveX = endX - startX;
		
		if(Math.abs(moveX) > 100){
			if(moveX > 0){			//上一页
				if(index == 1 || !index || index == 2 || index == 3){
					return;
				}
				content.style.transform = 'translateX('+(2-index)*100+'vw)';
			}
			else if(moveX < 0){
				if(index == 3 || !index || index == 1){
					return;
				}
				var page3img = document.querySelectorAll(".page3_content img");
				page3img[0].src = '../imager/battle/1-1.png';
				page3img[1].src = '../imager/battle/1-2.png';
				
				content.style.transform = 'translateX(-'+index*100+'vw)';
			}
		}
	})
	
	function getdom(id){
		if(id.className == 'page'){
			return id.id;
		}
		else{
			return getdom(id.parentNode);
		}
	}
	
}

var num = 0;
function page3_phone(){
	var content = document.querySelector(".content");
	var share = document.querySelector(".share");
	var page3_content = document.querySelector(".page3_content");
	var page3img = page3_content.querySelectorAll("img");
	var page3button = page3_content.querySelectorAll("button");
	
	var timer = setInterval(function(){
		num = num + 1;
		if(num > 2){
			num = 1;
		}
		page3_content.style.background = 'url(../imager/battle/bj'+num+'.jpg)';
		page3_content.style.backgroundSize = 'cover';
	},8000)
	
	page3button[0].addEventListener("click",function(){
		if(num == 1){
			page3button[0].innerText = '分 享';				
			share.style.display = 'block';
			return;
		}
		if(num > 0 || num < 5){
			num--;
		}
		page3img[0].src = '../imager/battle/'+num+'-1.png';
		page3img[1].src = '../imager/battle/'+num+'-2.png';
		page3button[1].style.display = 'block';
		page3button[1].innerText = '下一位';
	})
	
	page3button[1].addEventListener("click",function(){
		if(num == 4){
			page3button[1].style.display = 'none';
		}
		if(num < 5 || num > 0){
			num++;
		}
		page3img[0].src = '../imager/battle/'+num+'-1.png';
		page3img[1].src = '../imager/battle/'+num+'-2.png';
		page3button[0].innerText = '上一位';
	})
	
	share.addEventListener("click",function(){
		share.style.display = 'none';
	})
	
	page3img[0].addEventListener("touchstart",function(){
		page3img[1].style.opacity = 1;
		page3img[0].style.opacity = 0;
		page3img[1].style.transition = '1s ease';
	})
	
	page3img[0].addEventListener("touchend",function(){
		page3img[1].style.opacity = 0;
		page3img[0].style.opacity = 1;
	})
	
}





music();
page1_down();
page();
page3_phone();