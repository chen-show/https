var zmFdj=function(){
    var thumbElem=document.getElementsByClassName("thumb")[0],
    // 获取缩略图距离页面左边的距离
        thumbPosX=Math.round(thumbElem.getBoundingClientRect().left+document.documentElement.scrollLeft),
    // 获取缩略图距离页面顶部的距离
        thumbPosY=Math.round(thumbElem.getBoundingClientRect().top+document.documentElement.scrollTop);
    // 获取移动的元素
    var moveElem=document.getElementsByClassName("move")[0];

    thumbElem.onmousemove=function(e){
        // 获取移动的元素的宽和高
        var moveElemW=moveElem.offsetWidth;
        var moveElemH=moveElem.offsetWidth;
        // 计算移动元素距离缩略图左边和顶部的距离
        var x=e.pageX-thumbPosX;
        var y=e.pageY-thumbPosY;
        // 设置鼠标指针在移动元素的中间位置
        moveElem.style.left=x-moveElemW/2+"px";
        moveElem.style.top=y-moveElemH/2+"px";
        // 移动元素不能超出区域
        if(parseInt(moveElem.style.left)<0){
            moveElem.style.left=0;
        }else if(parseInt(moveElem.style.left)>(thumbElem.offsetWidth-moveElemW)){
            moveElem.style.left=thumbElem.offsetWidth-moveElemW+"px";
        }
        if(parseInt(moveElem.style.top)<0){
            moveElem.style.top=0;
        }else if(parseInt(moveElem.style.top)>(thumbElem.offsetHeight-moveElemH)){
            moveElem.style.top=thumbElem.offsetHeight-moveElemH+"px";
        }
        // 放大的倍数
        var sca=thumbElem.offsetWidth/moveElemW;
        var scaleEle=document.getElementsByClassName("scale")[0];
        // 放大图片的位置
        var img=scaleEle.getElementsByTagName("img")[0];
        img.style.left=-(sca*parseInt(moveElem.style.left))+"px";
        img.style.top=-(sca*parseInt(moveElem.style.top))+"px";
    }
}
zmFdj();