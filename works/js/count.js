page1_down();
music();
count_down();

function page1_down(){
	var page1_content = document.querySelector(".page1_content span");
	var page = document.querySelectorAll(".page");
	var page_span = document.querySelector("#page1 span");
	var music = document.querySelector(".music");
	var num = 0,str = '';
	
	var timear1 = setInterval(function(){
		str += '.';
		page_span.innerText = str;
		if(str.length == 3){
			str = '';
		}
	},200)
	var timear2 = setInterval(function(){
		num++;
		page1_content.style.width = num +'%';
		if(num == 100){
			page[0].style.opacity = 0;
			page[0].style.zIndex = 0;
			page[0].className = 'page page1_exit';
			page[1].style.opacity = 1;
			page[1].style.zIndex = 1;
			page[1].className = 'page page1_start';
			music.style.opacity = 1;
			
			var click = setTimeout(function(){
				love();
			},3000);
			
			clearInterval(timear1);
			clearInterval(timear2);
		}
	},10)
	
}

function music(){
	var music_img = document.querySelector(".music img");
	var my_audio = document.querySelector(".music audio");
	
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


function count_down(){
	var my_day = document.querySelector(".first h2");
	var my_time = document.querySelectorAll(".first p b");
	
	
	var time = function(){
		var newtime = new Date();
		var endtime = new Date("2021/6/18");
		var distime = endtime.getTime() - newtime.getTime();
		var day = Math.floor(distime/(1000*60*60*24));
		var hour = Math.floor(distime/(1000*60*60)%24);
		var minute = Math.floor(distime/(1000*60)%60);
		var second = Math.floor(distime/1000%60);
		
		my_day.innerText = day;
		my_time[0].innerText = hour;
		my_time[1].innerText = minute;
		my_time[2].innerText = second;
		
	}
	var timer = setInterval(function(){
		time();
	},1000)
	
}
function love(){
	var page2_content = document.querySelector(".page2_content h2");
	var first = document.querySelector(".first");
	var click = document.querySelector(".click");
	var click_p = document.querySelector(".click p");
	var page2 = document.querySelector("#page2");
	var page2_botter = document.querySelectorAll(".page2_botter img");
	var div = document.createElement("div");
	var number = 425363;
	window.addEventListener("click",function(e){
		
		number = number + 1;
		page2_content.innerText = '全国人民点赞加油共计:';
		click.style.display = 'block';
		first.style.display = 'none';
		page2_botter[2].style.display = 'none';
		click_p.innerText = number + '次';
		
		page2.appendChild(div);
		div.className = 'mylove';
		var ev = e||window.event;
		var x = ev.pageX - div.offsetWidth / 2;
		var y = ev.pageY - div.offsetHeight / 2;
	    div.style.left = x + "px";
	    div.style.top = y + "px";
		
	})
}