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
    topWall.graphics.beginFill("#000000").drawRect(50, 0, window.innerWidth, 10);
    leftWall.graphics.beginFill("#000000").drawRect(50, 0, 10, window.innerHeight);
    bottomWall.graphics.beginFill("#000000").drawRect(50, window.innerHeight-10, window.innerWidth, 10);
    rightWall.graphics.beginFill("#000000").drawRect(window.innerWidth-10, 0, 10, window.innerHeight);

    stage.addChild(topWall);
    stage.addChild(leftWall);
    stage.addChild(bottomWall);
    stage.addChild(rightWall);
}