page();
music();



function page(){
	var content = document.querySelector(".content");
	var startX,moveX,endX,index;
	
	content.addEventListener("touchstart",function(e){
		var ev = e||window.event;
		startX = ev.changedTouches[0].pageX;
		index = getdom(ev.target).slice(-1);
	})
	content.addEventListener("touchmove",function(e){
		
	})
	content.addEventListener("touchend",function(e){
		var ev = e||window.event;
		endX = ev.changedTouches[0].pageX;
		moveX = endX - startX;
		
		var music_img = document.querySelector(".music img");
		var my_audio = document.getElementById("my_audio");
		
		var page2_issue = document.querySelector(".page2_issue");
		var page2_content = document.querySelector(".page2_content img");
		var num = 0;
		
		
		if(Math.abs(moveX) > 80){
			if(moveX > 0){		//上一页
				return;
//				content.style.transform = 'translateX('+(2-index)*100+'vw)';
			}
			else if(moveX < 0){
				if(index == 4 || !index || index == 2 || index == 3){
					return;
				}
				if(index == 1){
					music_img.style.animation = 'music 2s infinite linear';
					music_img.style.opacity = 1;
					page2_issue.style.display = 'block';
					my_audio.play();
					
					var timer = setInterval(function(){
						num++;
						page2_content.src = '../imager/poem/p2/p2_'+num+'.png';
						if(num == 5){
							num = 0;
						}
					},5000)
				}
				content.style.transform = 'translateX(-'+index*100+'vw)';
			}
		}
		
	})
	
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
	var music_img = document.querySelector(".music img");
	var my_audio = document.getElementById("my_audio");
	
	music_img.addEventListener("click",function(){
		if(my_audio.paused){
			music_img.style.animation = 'music 2s infinite linear';
			my_audio.play();
		}
		else{
			music_img.style.animationPlayState = 'paused';
			my_audio.pause();
		}
	})
}



var page_str = 0;
function pair(next,str){
	var index = 0,
		num = 4,
		name = ['文盲','跟班','下生','书童','书生','绣花','举人','进士','探花','榜眼','状元',];
	var page2_issue = document.querySelectorAll(".page2_issue");
	var content = document.querySelector(".content");
	var page3_content = document.querySelector(".page3_content span");
	var page4_content = document.querySelector("#page4 h2");
	
	page_str += str;
	index = next - 1;
	
	page4_content.innerText = "答对"+page_str+"到,获得<"+name[page_str]+">称号";
	
	page2_issue[index].style.display = 'none';
	
	if(next == 10){
		var timer = setInterval(function(){
			num--;
			page3_content.innerText = num;
			if(num == 0){
				content.style.transform = 'translateX(-300vw)';
				clearInterval(timer);
			}
		},1000)
		content.style.transform = 'translateX(-200vw)';
	}
	else{
		page2_issue[next].style.display = 'block';
	}
}
