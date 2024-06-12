
window.onload = () => {
    let width = window.screen.availWidth;
    if (width > 300 && width < 420) {
        document.querySelector('.loading').style.display = 'none';
    }
}


click_page = ()=>{
    let downs = document.querySelectorAll(".page_down");
    let content = document.querySelector(".content");
    let pages = document.querySelectorAll(".page");
    
    for(let i=0;i<downs.length;i++){
        downs[i].addEventListener("click",e=>{
            if(i == pages.length-2){
            content.style.transform = `translateY(-100vh)`;
                return;
            }
            animation(i);
            content.style.transform = `translateY(-${(i+2)*100}vh)`;
        })
    }
    
}


getID = dom=>{
    if(dom.className == 'page'){
        return dom.id;
    }
    return getID(dom.parentNode);
}

animation = index=>{
    let page5_content = document.querySelectorAll(".page5_content img");
    for(let i=0;i<page5_content.length;i++){
        page5_content[i].className = '';
    }
    if(index == 4 || index == 2 || index == 6){
        page5_content[0].className = 'water1';
        page5_content[1].className = 'water2';
        page5_content[2].className = 'water3';
    }
}


slide_page = ()=>{
    let content = document.querySelector(".content");
    let pages = document.querySelectorAll(".page");
    let height = pages[0].offsetHeight;
    let startY,moveY,endY,index;

    content.addEventListener("touchstart",e=>{
        let ev = e||window.event;
        startY = ev.changedTouches[0].pageY;
        index = getID(ev.target).slice(-1);
    })

    content.addEventListener("touchend",e=>{
        let ev = e||window.event;
        endY = ev.changedTouches[0].pageY;
        moveY = endY - startY;

        if(Math.abs(moveY) > 120){
            if(moveY > 0){
                if(index == 1 || !index){
                    return;
                }
                animation(index);
                content.style.transform = `translateY(${(2-index)*height}px)`;
            }
            else if(moveY < 0){
                if(index == pages.length || !index){
                    return;
                }
                animation(index);
                content.style.transform = `translateY(-${index*height}px)`;
            }
        }
    })
}


music = ()=>{
    let music_img = document.querySelector(".music img");
    let music_audio = document.querySelector(".music audio");

    music_img.addEventListener("click",e=>{
        if(music_audio.paused){
            music_img.style.animation = 'music 2s infinite linear';
            music_audio.play();
        }
        else{
            music_img.style.animationPlayState = 'paused';
            music_audio.pause();
        }
    })

}


page_load = ()=>{
    let content = document.querySelector(".content");
    let load = document.querySelector(".load span");
    let dot_span = document.querySelector(".page1_dot span");
    let dot_p = document.querySelector(".page1_dot p");
    let num = count = 0,str = '',timer1,timer2,timer3;
    
    timer1 = setInterval(()=>{
        num++;
        load.style.width = num + '%';
        if(num == 100){
            clearInterval(timer1);
        }
    },50)

    timer2 = setInterval(()=>{
        str = str + '.';
        dot_p.innerText = str;
        if(str.length == 3){
            str = '';
        }
    },200)

    timer3 = setInterval(()=>{
        count++;
        dot_span.innerText = count + '%';
        if(count >= 100){
            clearInterval(timer2);
            content.style.transform = 'translateY(-740px)';
            clearInterval(timer3);
        }
    },50)
}


page3_car = ()=>{
    let page3_content = document.querySelector(".page3_content");
    let page3_b = document.querySelector(".page3_content b");
    let page3_strong = document.querySelector(".page3_content strong");
    let page3_car = document.querySelector("#page3 img");
    let width = document.body.offsetWidth - page3_car.offsetWidth/2;
    let startX,moveX,endX;

	
    page3_car.addEventListener("touchstart",e=>{
        let ev = e||window.event;
        startX = ev.targetTouches[0].clientX - page3_car.offsetLeft;
    })
    page3_car.addEventListener("touchmove",e=>{
        let ev = e||window.event;
        endX = ev.targetTouches[0].clientX;
        moveX = endX - startX;
        
        if(moveX < 0){
            moveX = 0;
        }
        if(moveX > width){
            moveX = width;
        }
        page3_car.style.left = moveX + 'px';
        page3_b.style.opacity = 0;
        page3_strong.style.opacity = 0;
        page3_content.style.transform = `translateX(${-moveX*2}px)`;
        if(moveX >3 && moveX < 150){
            page3_b.style.opacity = 1;
        }
        if(moveX >200 && moveX < 300){
            page3_strong.style.opacity = 1;
        }
    })
}



page4_click = ()=>{
    let content = document.querySelector(".content");
    let page4_star = document.querySelector(".page4_content span");
    let page4_font = document.querySelectorAll(".page4_content img");
    let page4_btn = document.querySelectorAll(".page4_btn button");
    let str = '美丽中国',num=star='';

    let click = ()=>{
        num = '';
        star = '';
        page4_star.innerText = '';
    }
    let font = ()=>{
        if(num.length >= 4){
            return;
        }
        else{
            star = star + '*';
            page4_star.innerText = star;
        }
    }
    page4_btn[0].addEventListener("click",()=>{
        click();
    })
    page4_btn[1].addEventListener("click",()=>{
        if(num === str){
            content.style.transform = `translateY(-${740*4}px)`;
        }
        click();
    })
    page4_font[0].addEventListener("click",()=>{
        font();
        num = num + '国';
    })
    page4_font[1].addEventListener("click",()=>{
        font();
        num = num + '美';
    })
    page4_font[2].addEventListener("click",()=>{
        font();
        num = num + '丽';
    })
    page4_font[3].addEventListener("click",()=>{
        font();
        num = num + '中';
    })

}


page5_shade = ()=>{
    let shade = document.querySelector(".shade");
    let page5 = document.querySelectorAll(".page");
    page5[4].addEventListener("touchmove",e=>{
        let ev = e||window.event;
        let moveX = ev.changedTouches[0].pageX;
        let moveY = ev.changedTouches[0].pageY;
        shade.style.clipPath = `circle(50px at ${moveX}px ${moveY}px)`;
    })
}

let score_str = 0;
page6_pair = (next,score)=>{
    let index = 0;
    let content = document.querySelector(".content");
    let page_issue = document.querySelectorAll(".page_issue");
    let page6_content = document.querySelector(".page6_content h3");
    let name = ['跟班','下生','书童','书生','绣花','举人','进士','探花','榜眼','状元'];

    score_str += score;
    index = next - 1;
	page_issue[index].style.display = 'none';

    if(next >= 10){
        page6_content.style.display = 'block';
        page6_content.innerText = `答对${score_str}道,获得<${name[score_str-1]}>称号`;
        content.style.transform = `translateY(-${740*6}px)`;
    }
    else{
        page_issue[next].style.display = 'block';
    }
}


page8_love = ()=>{
    let page8_title = document.querySelectorAll(".page8_title span");
    let show_div = document.querySelectorAll(".show_div");
    let pages = document.querySelectorAll(".page");
    let show_strong = document.querySelector(".show_div strong");
    let show_b = document.querySelectorAll(".show_div b");
    let div = document.createElement("div");
    let pageX,pageY,time,timer;

    time = ()=>{
        let nowTime = new Date();
        let endTime = new Date("2021/7/18");
        let disTime = endTime.getTime() - nowTime.getTime();
        let day = Math.floor(disTime/(1000*60*60*24));
        let hour = Math.floor(disTime/(1000*60*60)%24);
        let minute = Math.floor(disTime/(1000*60)%60);
        let second = Math.floor(disTime/1000%60);

        show_strong.innerText = day;
        show_b[0].innerText = hour;
        show_b[1].innerText = minute;
        show_b[2].innerText = second;
    }

    timer = setInterval(() => {
        time();
    }, 1000);

    
    pages[7].addEventListener("click",e=>{
        let ev = e||window.event;
        pages[7].appendChild(div);
        div.className = 'love';
        pageX = ev.pageX + div.offsetWidth/2;
        pageY = ev.pageY + div.offsetHeight/2;
        div.style.left = pageX + 'px';
        div.style.top = pageY + 'px';
    })


    page8_title[0].addEventListener("click",e=>{
        show_div[0].style.display = 'block';
        show_div[1].style.display = 'none';
    })
    page8_title[1].addEventListener("click",e=>{
        show_div[1].style.display = 'block';
        show_div[0].style.display = 'none';
    })
}



page7_game = ()=>{
    let content = document.querySelector(".content");
    let page7_footer = document.querySelector(".page7_footer button");
    let page7_content = document.querySelectorAll(".page7_content span");
    let str = '111111111',count = [0,0,0,0,0,0,0,0,0],timer;

    page7_footer.addEventListener("click",()=>{
        count = [0,0,0,0,0,0,0,0,0];
        for(let i=0;i<page7_content.length;i++){
            page7_content[i].style.background = 'rgb(255, 242, 231)';
        }
    })

    for(let j=0;j<page7_content.length;j++){
        page7_content[j].addEventListener("click",()=>{
            if(j == 0){
                if(count[0]){
                    page7_content[0].style.background = 'rgb(255, 242, 231)';
                    count.splice(0,1,0);
                }
                else{
                    page7_content[0].style.background = 'sandybrown';
                    count.splice(0,1,1);
                }
            }
            else{
                if(count[j]){
                    page7_content[j].style.background = 'rgb(255, 242, 231)';
                    count.splice(j,1,0);
                }
                else{
                    page7_content[j].style.background = 'sandybrown';
                    count.splice(j,1,1);
                }
            }
            
            let num = count.join("");
            if(num === str){
                timer = setTimeout(() => {
                    content.style.transform = `translateY(-${740*7}px)`;
                }, 1000);
            }
        })
    }
}




click_page();
slide_page();
music();
page_load();
page3_car();
page4_click();
page5_shade();
page7_game();
page8_love();