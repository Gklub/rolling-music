/**
 * Created by lcj on 2015/5/23.
 */

var ori=0;
function onestep(){
    var movePart = new Array(  "dir_first_first",
        "dir_first_second",
        "dir_second_first",
        "dir_second_second",
        "dir_third_first",
        "dir_third_second");


    var j = 1;
    var moveDist = 1.5;                                                                                                 //偏移量
    var moveTime = 70;                                                                                                  //偏移时间
    var a =Math.ceil((Math.random() * 10) % 6-1);                                                                       //which to move
    var timer = setInterval(setTop,10);//第二个参数为时间毫秒，越少速度越快，自己调试多少适合
    console.log(a);


    function setTop(){
            if(j <=moveTime ){
            document.getElementById(movePart[a]).style.display="inline";
            $(function() {
                $("#"+movePart[a]).fadeOut(950);
            });
            for (var i=1;i<=10;i++)
            {
                p=document.getElementById(movePart[a]).style.top.replace('px', '')-moveDist;
                document.getElementById(movePart[a]).style.top=p+'px';
            }
            j++;

        }else{
            clearInterval(timer);
            setTimeout(function(){ document.getElementById(movePart[a]).style.top="1050px";
            },50);
        }
    }                                                                                                                       //箭头掉落

    function deviceMotionHandler(eventData) {
        //
        var acceleration = eventData.accelerationIncludingGravity;
        var facingUp = -1;
        if (acceleration.z > 0) {
            facingUp = +1;
        }
        tiltLR = Math.round(((acceleration.x) / 9.81) * -90);                                                               //左右辨别
        tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
        var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
    }

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',deviceMotionHandler, false);
    }else{
        alert('亲，你的浏览器不支持DeviceMotionEvent哦~');
    }                                                                                                                        //判断手机摇晃

    var jj=1;
    setTimeout(function(){judgement =setInterval(judge,50);},600);                                                     //judging if it's true

    function judge(){
        ori=document.getElementById("result").innerHTML;
        if(jj<=10){
            if(a%2==0)
            {
                if (tiltLR < -10) {
                    var score = +document.getElementById("result").innerHTML;
                    score += 1;
                    document.getElementById("result").innerHTML = score;                                                   //成功
                    //disappear();
                }
            }else {
                if (tiltLR > 10) {
                    var score = +document.getElementById("result").innerHTML;
                    score += 1;
                    document.getElementById("result").innerHTML = score;                                                   //成功
                    //disappear();
                }
            }
            jj++;                                                                                                       //get score
            if((score-ori)==10)
            {
                $(function() {
                    $('#pic_result').fadeIn(50);
                });
                $(function(){
                    $('#pic_result').attr("src","imgs/perfect.png");
                });
                setTimeout((function() {
                    $('#pic_result').fadeOut(50);
                }),500);
            }else{
                if((score-ori)>=4)
                {
                    $(function() {
                        $('#pic_result').fadeIn(50);
                    });
                    $(function(){
                        $('#pic_result').attr("src","imgs/good.png");
                    });
                    setTimeout((function() {
                        $('#pic_result').fadeOut(50);
                    }),500);
                }else{
                    $(function() {
                        $('#pic_result').fadeIn(50);
                    });
                    $(function(){
                        $('#pic_result').attr("src","imgs/bad.png");
                    });
                    setTimeout((function() {
                        $('#pic_result').fadeOut(50);
                    }),500);
                }
            }

        }else{
            clearInterval(judgement);
        }
    }
/*
    function disappear(){
        var jjj=1
        disap=setInterval(disa,10);
        function disa(){
            if(jjj<=10)
            {
                for(var i=0;i<10;i++)
                {
                    var wid=document.getElementById(movePart[a]).style.width.replace('px','')-1;
                    document.getElementById(movePart[a]).style.width=wid+"px";
                }
                jjj++;
            }else{
                clearInterval(disap);
                document.getElementById(movePart[a]).style.width="100px";
            }
        }
    }
    */
}
