var pageindex = 0;
var down;
var section;

onload();
music();

function onload(){
	down = document.getElementById("down").getElementsByTagName("li");
	section = document.getElementById("section");
	
	for(var i=0;i<down.length;i++){
		down[i].index = i;
		down[i].onclick = change;
	}
	var top = document.getElementById("top_meat").getElementsByTagName("li");
	
	for(var i=0;i<top.length;i++){
		top[i].index = i;
		top[i].onclick = change;
	}
	
	window.resize = function(){
		pageindex = this.index * (-100);
		section.style.transform = 'translateX('+pageindex+'vw)';
		section.style.transition = 'all 0s ease-in-out';
		
	}
	window.setTimeout(function(){
		section.style.transition = 'all 1s ease-in-out';
	},1)
}
function change(){
	pageindex = this.index * (-100);
	section.style.transform = 'translateX('+pageindex+'vw)';
	var top = document.getElementById("top_meat").getElementsByTagName("li");
	for(var i=0;i<top.length;i++){
		down[i].style.color = '#DBDBDB';
		down[i].style.transform = 'scale(1)';
		top[i].style.transform = 'scale(1)';
		top[i].style.color = '#DBDBDB';
	}
	i = this.index;
	down[i].style.color = '#00FFFF';
	top[i].style.color = '#00FFFF';
	top[i].style.transform = 'scale(1.2)';
	down[i].style.transform = 'scale(1.2)';
}
function music(){
	var img_music = document.getElementsByClassName("img_music")[0];
	var audio = document.getElementsByClassName("audio")[0];
	img_music.onclick = function(){
		if(audio.paused){
			img_music.style.animation = "music 4s linear infinite";
			audio.play();
		}
		else{
			img_music.style.animationPlayState = "paused";
			audio.pause();
		}
	}
	
}
	

drag();
function drag(){
	var content = document.getElementsByClassName("content")[0];
	var pages = document.getElementsByClassName("page");
	var startY,endY,distance=0;		
	var index = 0;	
	
	document.addEventListener('touchstart',function(e){
		var ev = e||window.event;
		var touch = ev.touches[0];
		startY = touch.pageY;		
	});
	document.addEventListener('touchmove',function(e){
		var ev = e||window.event;
		var touch = ev.touches[0];
		endY = touch.pageY;		
		distance = startY - endY;
	});
	document.addEventListener('touchend',function(e){
		if(Math.abs(distance)>200){		
			if(distance > 0){			
				upglide(index);
			}
			else{
				glide(index);
			}
		}
	});
		
	function upglide(n){
		if(n<pages.length-1){
			n++;
			index++;
			for(var j=0;j<pages.length;j++){
				pages[j].style.transform = 'translateY(-'+(index*100)+'%)';
				pages[j].style.transition = '1s';
			}
		}
		startY=endY=distance=0;
	}
		
	function glide(n){
		if(n > 0){
			n--;
			index--;
			for(var j=0;j<pages.length;j++){
				pages[j].style.transform = 'translateY(-'+(index*100)+'%)';
				pages[j].style.transition = '1s';
			}
		}
		startY=endY=distance=0;
	}
	
	
}