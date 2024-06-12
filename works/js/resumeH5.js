load();
function load(){
	var page = document.getElementsByClassName("page");
	var color = document.getElementsByClassName("color")[0];
	var loadtime = 0;
	var loadshow = setInterval(function(){
		loadtime++;
		color.style.width = loadtime +'%';
		if(loadtime == 100){
			for(var i=0;i<page.length;i++){
				page[i].style.transform = 'translateY(-100%)';
				page[i].style.transition = '1s';
			}
			clearInterval(loadshow);
		}
	},10);
}


page();
function page(){
	var hat = document.getElementsByClassName("hat")[0].getElementsByTagName("img")[0];
	var phone = document.getElementsByClassName("phone")[0].getElementsByTagName("img")[0];
	var line = document.getElementsByClassName("line")[0]
	var p = document.getElementsByClassName("message")[0].getElementsByTagName("p");
	var down = document.getElementsByClassName("down")[0];
	var page = document.getElementsByClassName("page");
	var divmessage = document.getElementsByClassName("divmessage")[0];
	
	down.onclick = function(){
		for(var i=0;i<page.length;i++){
			page[i].style.transform = 'translateY(-200%)';
			page[i].style.transition = '1s';
		}
		var divmessage1 = self.setTimeout(function(){
			divmessage.style.animation = 'up 1s forwards';
		},1000);
	}
	
	var pageshow1 = self.setTimeout(function(){
		hat.style.animation = 'hat 3s forwards';
	},1000);
	var pageshow2 = self.setTimeout(function(){
		line.style.animation = 'line 2s forwards';
	},1500);
	var pageshow3 = self.setTimeout(function(){
		p[0].style.animation = 'p1 1s forwards';
	},2000);
	var pageshow4 = self.setTimeout(function(){
		p[1].style.animation = 'p2 1s forwards';
	},2500);
	var pageshow5 = self.setTimeout(function(){
		p[2].style.animation = 'p3 1s forwards';
	},3000);
	var pageshow6 = self.setTimeout(function(){
		phone.style.animation = 'phone 2s forwards';
	},3500);
}


pagediv();
function pagediv(){
	var navimg = document.getElementsByClassName("navimg");
	var showdiv = document.getElementsByClassName("showdiv");
	for(var i=0;i<navimg.length;i++){
		navimg[i].index = i;
		navimg[i].onclick = changediv;
	}
}

function changediv(){
	var navimg = document.getElementsByClassName("navimg");
	var showdiv = document.getElementsByClassName("showdiv");
	
	for(var j=0;j<navimg.length;j++){
		showdiv[j].style.display = 'none';
		navimg[j].style.width = '120px';
		navimg[j].style.height = '400px';
	}
	i = this.index;
	showdiv[i].style.display = 'block';
	navimg[i].style.width = '150px';
	navimg[i].style.height = '500px';
	
	var divmessage = document.getElementsByClassName("divmessage")[0];
	var block = document.getElementsByClassName("block");
	var introduce = document.getElementsByClassName("introduce")[0].getElementsByTagName("span")[0];
	
	if(i == 0){
		divmessage.style.animation = 'up 1s forwards';
	}
	else if(i == 1){
		showdiv[1].style.visibility = 'visible';
	}
	else if(i == 2){
		var blockshow1 = setTimeout(function(){
			block[0].style.animation = 'block1 1s forwards';
		},500);
		var blockshow2 = setTimeout(function(){
			block[1].style.animation = 'block2 1s forwards';
		},1500);
		var blockshow3 = setTimeout(function(){
			block[2].style.animation = 'block3 1s forwards';
		},2500);
		var blockshow4 = setTimeout(function(){
			block[3].style.animation = 'block4 1s forwards';
		},3000);
	}
	else if(i == 4){
		var blockshow5 = setTimeout(function(){
			introduce.style.animation = 'magnifyop 1s forwards';
		},2000);
	}
}


drag();
function drag(){
	var drag = document.getElementsByClassName("drag")[0];
	var maxX = document.body.clientWidth - drag.offsetWidth;
	
	drag.addEventListener('touchstart',function(e){
		var ev = e||window.event;
		var touch = ev.targetTouches[0];
		nowX = touch.clientX - drag.offsetLeft;
		document.addEventListener('touchmove',defaultEvent,false);
	});
	drag.addEventListener('touchmove',function(e){
		var dragimg = document.getElementsByClassName("dragimg");
		var dragspan1 = dragimg[0].getElementsByTagName("span")[0];
		var dragspan2 = dragimg[1].getElementsByTagName("span")[0];
		var dragspan3 = dragimg[2].getElementsByTagName("span")[0];
		var opacity = 1;
		var ev = e||window.event;
		var touch = ev.targetTouches[0];
		var newX = touch.clientX - nowX;
		if(newX < maxX){
			newX = maxX;
		}
		if(newX > 0){
			newX = 0;
		}
		dragimg[0].style.opacity = (opacity/newX*-40);
		dragspan1.style.transform = 'rotateY('+(newX/-4)+'deg)';
		var newX1 = newX + 800;
		dragimg[1].style.opacity = (opacity/newX1*-40);
		dragspan2.style.transform = 'rotateY('+(newX1/-4)+'deg)';
		var newX2 = newX + 1600;
		dragimg[2].style.opacity = (opacity/newX2*-40);
		dragspan3.style.transform = 'rotateY('+(newX2/-4)+'deg)';
		drag.style.left = newX + 'px';
	});
	drag.addEventListener('touchend',function(){
		document.removeEventListener('touchmove',defaultEvent);
	});
	function defaultEvent(e){
		e.preventDefault;
	}
}



touchenent();
function touchenent(){
	var page = document.getElementsByClassName("page");
	var startY,endY,distance=0;
	
	page[2].addEventListener('touchstart',function(e){
		var ev = e||window.event;
		var touch = ev.touches[0]
		startY = touch.pageY;
	});
	page[2].addEventListener('touchmove',function(e){
		var ev = e||window.event;
		var touch = ev.touches[0];
		endY = touch.pageY;
		distance = startY - endY;
	});
	page[2].addEventListener('touchend',function(e){
		if(Math.abs(distance) > 300){
			if(distance < 0){
				downtouch();
			}
		}
	})
	
	function downtouch(){
		for(var j=0;j<page.length;j++){
			page[j].style.transform = 'translateY(-100%)';
			page[j].style.transition = '1s';
		}
		startY=endY=distance=0;
	}
	
}
