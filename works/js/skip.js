const input = document.querySelector("input");
const label = document.querySelector("label");

input.addEventListener("input", event => {
	const value = Number(input.value) / 100;
	input.style.setProperty("--thumb-rotate", `${value * 720}deg`);
	label.innerHTML = Math.round(value * 100);
});

function robot() {
	setTimeout(function () {
		alert("该作品无聊天记录请勿刷新或离开!!!");
		window.location.href = '../skip/robot.html';
	}, 100)
}
function music() {
	setTimeout(function () {
		alert("该作品为网易接口,展示音乐均为免费,无版权音乐点击播放无效哦!!!");
		window.location.href = '../skip/music.html';
	}, 100)
}
function covid() {
	setTimeout(function () {
		alert("无框架纯原生前端代码,手机电脑适配,要带口罩哦!!!");
		window.location.href = '../skip/covid.html';
	}, 100)
}
function happy () {
  setTimeout(function () {
    alert("给予罗小姐的生日祝福!-纪念版");
    window.location.href = '../skip/happy.html';
  }, 100)
}
function resumeH5() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意个人网页可定制类似作品!!!");
			window.location.href = '../skip/resumeH5.html';
		}, 100)
		return true;
	}
}

function test_1() {
	var width = $(window).width();
	if (width > 1024) {
		alert("还在学习中呢!可先浏览其他H5作品哦!!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("还在学习中呢!可先浏览其他H5作品哦!!!");
		}, 100)
		return false;
	}
}

function meat() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意作品仅提供学习!!!");
			window.location.href = '../skip/meat.html';
		}, 100)
		return true;
	}
}

function game () {
  var width = $(window).width();
  if (width > 1024) {
    alert("该作品仅支持手机或模拟器浏览!!!");
    return false;
  }
  else {
    setTimeout(function () {
      alert("即将进入,请注意作品仅提供学习!!!");
      window.location.href = '../skip/gameIframe.html';
    }, 100)
    return true;
  }
}

function count() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意作品仅提供学习!!!");
			window.location.href = '../skip/count.html';
		}, 100)
		return true;
	}
}

function wild_chila() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意作品仅提供学习!!!");
			window.location.href = '../skip/wild_chila.html';
		}, 100)
		return true;
	}
}

function battle() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意作品仅提供学习!!!");
			window.location.href = '../skip/battle.html';
		}, 100)
		return true;
	}
}

function poem() {
	var width = $(window).width();
	if (width > 1024) {
		alert("该作品仅支持手机或模拟器浏览!!!");
		return false;
	}
	else {
		setTimeout(function () {
			alert("即将进入,请注意作品仅提供学习!!!");
			window.location.href = '../skip/poem.html';
		}, 100)
		return true;
	}
}
