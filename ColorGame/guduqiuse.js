/**
 * Created by qkk on 14-7-31.
 */
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
//画布边长
var screenLength=590;
//颜色库
var colors=["#FFFF99","#00FF00","#0099FF","#0000FF","#FF0000","#00FF00","#FFFF00","#99FFDD","#6666FF"]
var colors2=["#FFFFCC","#00FF99","#00FFFF","#000099","#FF0099","#00CC33","#FFCC44","#99FFEE","#6666CC"]
//初始化 最初的方块数量 全局变量
var clickTime=2;
//颜色不同的那块 随机数值
var otherColorBlockNum=0;
//当前边长
var nowAmount=1;
function draw(amount){
    //当前边长
    nowAmount=amount;
    var totalLength=screenLength/amount;
    var sideLength=totalLength*0.9;
    //取俩随机数
    var random=Math.random();
    var random2=Math.random();
    //两种颜色
    var thisColor=colors[Math.ceil(random*9)-1];
    var otherColor=colors2[Math.ceil(random*9)-1];
    for(var row=0;row<amount;row++){
        for(var col=0;col<amount;col++){
            ctx.fillStyle = thisColor;
            ctx.fillRect(col*totalLength,row*totalLength,sideLength,sideLength);
        }
    }
    //画另外一种颜色
//    0到amount取随机数，随机取一块方块涂颜色
    var randomRow=Math.floor(random*amount);
    var randomCol=Math.floor(random2*amount);
    //给全局变量赋值，进行点击是否为 颜色不一样方块进行判断.
    otherColorBlockNum=randomRow*amount+randomCol+1;
//    console.log(randomRow+"*"+amount+"+"+randomCol+"+1---result:"+otherColorBlockNum);
    ctx.fillStyle = otherColor;
    ctx.clearRect(randomCol*totalLength,randomRow*totalLength,sideLength,sideLength);
    ctx.fillRect(randomCol*totalLength,randomRow*totalLength,sideLength,sideLength);

}
//初始化
draw(2);
$("#canvas").click(function(e){
//    if(clickTime<20)
        clickTime++;
    if(getPosition(e)==otherColorBlockNum){
        //清除画布
        ctx.clearRect(0,0,screenLength,screenLength);
        draw(clickTime);
        //更新得分
        $("#score").text(clickTime-2);
    }



});
//获取鼠标点击位置
function getPosition(e) {
    var x, y;
    if (e.layerX) {
        //ff
        x = e.layerX;
        y = e.layerY;
    } else {
        //Chrome
        x = e.offsetX;
        y = e.offsetY;
    }
    var blockTotalLength=screenLength/nowAmount;
    var col = (x - x % blockTotalLength) / blockTotalLength + 1;
    var row = (y - y % blockTotalLength) / blockTotalLength + 1;
    //返回点击位置
    return (row-1)*nowAmount+col;
}
var timeLock=setInterval(function(){
    var nowTime=$("#timeCount").text();
    $("#timeCount").text(nowTime-1);
    if(nowTime==1){
        var score=$("#score").text();
        clearInterval(timeLock);
        alert("嘻嘻，10秒钟内，我闯了"+score+"关，击败了100%的人！我是【孤独求色lv100】");
        window.location.reload();
    }
},1000);