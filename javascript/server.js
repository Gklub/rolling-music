/**
 * Created by lcj on 2015/5/24.
 */
AV.initialize("zppeiap29sp49qz59doinzavh6g3kekeg92f4hbn44i83mit", "vqk3x6uy0kgrzbdse8oznzdutoy4py46avi84o1fjr7qijlr");
// 初始化 param1：应用 id、param2：应用 key



function deviceMotionHandler(eventData) {
    //
    var acceleration = eventData.accelerationIncludingGravity;
    var facingUp = -1;
    if (acceleration.z > 0) {
        facingUp = +1;
    }
    tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
    tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);

    document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
    document.getElementById("moCalcTiltFB").innerHTML = tiltFB;

    var GameDirection = AV.Object.extend("GameDirection");
    var gameDir = new AV.Query(GameDirection);
    // 可以先查询出要修改的那条存储

// 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    gameDir.get('5560b410e4b0fca88ec29f27', {
        success: function (gameDir) {
            // 回调中可以取得这个 GameDir 对象的一个实例，然后就可以修改它了
            gameDir.set('score',tiltLR);
            gameDir.set('start',0);                                                                                     //等会改a
            gameDir.save();
            console.log("succeed");
            // The object was retrieved successfully.
        },
        error: function (object, error) {
            console.log(object);
            // The object was not retrieved successfully.
            // error is a AV.Error with an error code and description.
        }
    });
}
//
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler, false);
}else{
    alert('亲，你的浏览器不支持DeviceMotionEvent哦~');
}



