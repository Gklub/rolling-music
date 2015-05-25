/**
 * Created by lcj on 2015/5/24.
 */
AV.initialize("zppeiap29sp49qz59doinzavh6g3kekeg92f4hbn44i83mit", "vqk3x6uy0kgrzbdse8oznzdutoy4py46avi84o1fjr7qijlr");




var letsdo = setInterval(webbegin,100);
function webbegin(){
    var GameDirection = AV.Object.extend("GameDirection");
    var query = new AV.Query(GameDirection);
    query.equalTo("start");
    query.find({
        success: function (results) {
            // Do something with the returned AV.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                start_num = object.get('start');
            }
        },
        error: function (error) {
            console.log("Error: " + error.code + " " + error.message);
        }
    });
    if(start_num==1)
    {
        setInterval(onestep,1000);
        clearInterval(letsdo);
        document.getElementById('start_font').innerHTML=" ";
        var audio=$("#BGM")[0];
        audio.play();
    }
}




var tem=0;
function onestep() {
    var movePart = new Array("dir_first_first",
        "dir_first_second",
        "dir_second_first",
        "dir_second_second",
        "dir_third_first",
        "dir_third_second");

    var a = Math.ceil((Math.random() * 10) % 6 - 1);
    if(tem!=0)
    {
        if(bb==a)
            if(a<4)
                a+=2;
            else
                a-=2;
    }
    var moveTime = 1000;
    $(function setup() {
        $("#" + movePart[a]).animate({top: 680}, moveTime);
        setTimeout(function () {
            $("#" + movePart[a]).css("top", "-150px")
        }, 1100);
    });
    bb=a;
    tem++;
    var jj = 1;
    setTimeout(function () {
        judgement = setInterval(judge, 50);
    }, moveTime - 250);                                                     //judging if it's true

    function judge() {
        var GameDirection = AV.Object.extend("GameDirection");
        var query = new AV.Query(GameDirection);
        query.equalTo("score");
        query.find({
            success: function (results) {
                // Do something with the returned AV.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    tiltLR = object.get('score');
                }
            },
            error: function (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });                                                                                                             //
        ori = document.getElementById("result").innerHTML;
        if (jj <= 10) {
            if (a % 2 == 0) {
                if (tiltLR < -10) {
                    score_2 = +document.getElementById("result").innerHTML;
                    score_2 += 1;
                    document.getElementById("result").innerHTML = score_2;                                                   //成功
                    //disappear();
                }
            } else {
                if (tiltLR > 10) {
                    score_2 = +document.getElementById("result").innerHTML;
                    score_2 += 1;
                    document.getElementById("result").innerHTML = score_2;                                                   //成功
                    //disappear();
                }
            }
            jj++;                                                                                                       //get score
            console.log(ori);
            console.log(score_2);
            var temp=score_2-ori;
            if(temp!=0){
                temp=8;
            }
            if (temp == 10) {
                $(function () {
                    $('#pic_result').fadeIn(50);
                });
                $(function () {

                });
                setTimeout((function () {
                    $('#pic_result').fadeOut(50);
                }), 500);
            } else {
                if (temp >= 4) {
                    $(function () {
                        $('#pic_result').fadeIn(50);
                    });
                    $(function () {

                    });
                    setTimeout((function () {
                        $('#pic_result').fadeOut(50);
                    }), 500);
                } else {
                    $(function () {
                        $('#pic_result').fadeIn(50);
                    });
                    $(function () {

                    });
                    setTimeout((function () {
                        $('#pic_result').fadeOut(50);
                    }), 500);
                }
            }

        } else {
            clearInterval(judgement);
        }
    }
}