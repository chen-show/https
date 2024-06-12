
//鼠标点击字体样式
var font_id = 0;
var color_id = 0;
jQuery(document).ready(function ($) {
	$("body").click(function (e) {
		var font = new Array("❤", "富强", "民主", "OωO", "文明", "和谐",
			"╮(｡>口<｡)╭", "自由", "OωO", "平等", "❤", "公正", "法治", "爱国",
			"敬业", "❤", "诚信", "友善", "乐观", "❤", "积极", "向上", "(๑•́ ₃ •̀๑)",
			"自由", "(๑•́ ∀ •̀๑)", "正能量", "(*^▽^*)", "元气满满", "(๑•̀_•́๑)", "开心",
			"快乐", "❤", "善良", "╮(｡>口<｡)╭", "可爱", "暴富", "暴瘦", "❤");

		var color = new Array('#ff0000', '#eb4310', '#f6941d', '#fbb417',
			'#ffff00', '#cdd541', '#99cc33', '#3f9337', '#219167', '#239676',
			'#24998d', '#1f9baa', '#0080ff', '#3366cc', '#333399', '#003366',
			'#800080', '#a1488e', '#c71585', '#bd2158');

		var $i = $("<span />").text(font[font_id]);
		font_id = (font_id + 1) % font.length;
		color_id = (color_id + 1) % color.length;

		var ev = e || event,
			x = ev.pageX,
			y = ev.pageY;

		$i.css({
			"z-index": 999,
			"top": y - 20,
			"left": x,
			"position": "absolute",
			"font-weight": "bold",
			"color": color[color_id]
		});

		$("body").append($i);
		$i.animate({
			"top": y - 180,
			"opacity": 0
		}, 1500, function () {
			$i.remove();
		});
	});
});

//