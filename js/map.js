var topWall;
var leftWall;
var bottomWall;
var rightWall;

function createMap() {
    stage.removeChild(topWall);
    stage.removeChild(leftWall);
    stage.removeChild(bottomWall);
    stage.removeChild(rightWall);

    topWall = new createjs.Shape();
    leftWall = new createjs.Shape();
    bottomWall = new createjs.Shape();
    rightWall = new createjs.Shape();
    topWall.graphics.beginFill("#000000").drawRect(20, playerSize, window.innerWidth-40, 10);
    leftWall.graphics.beginFill("#000000").drawRect(10, playerSize, 10, window.innerHeight-playerSize*2);
    bottomWall.graphics.beginFill("#000000").drawRect(10, window.innerHeight-playerSize-10, window.innerWidth-20, 10);
    rightWall.graphics.beginFill("#000000").drawRect(window.innerWidth-20, playerSize, 10, window.innerHeight-playerSize*2);

    stage.addChild(topWall);
    stage.addChild(leftWall);
    stage.addChild(bottomWall);
    stage.addChild(rightWall);
}