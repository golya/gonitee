var stage, enemy, yellowEnemy;
var unitx = 5;
var unity = 7;
var yunitx = 5;
var yunity = 3;


function init() {
    stage = new createjs.Stage("game");

    var rect = new createjs.Shape();
    rect.graphics.beginFill("#000").drawRect(0, 0, 50, 50);
    stage.addChild(rect);

    stage.on("stagemouseup", function(evt) {
        rect.x = evt.stageX;
        rect.y = evt.stageY;
    });

    setObstructionObject();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick(event) {


    if (!event.paused) {

        if (enemy.x > 450 || enemy.x < 0 ) {
            unitx = -unitx;
        }
        if (enemy.y > 450 || enemy.y < 0 ) {
            unity = -unity;
        }

        if (yellowEnemy.x > 450 || yellowEnemy.x < 0 ) {
            yunitx = -yunitx;
        }
        if (yellowEnemy.y > 450 || yellowEnemy.y < 0 ) {
            yunity = -yunity;
        }

        enemy.x += unitx;
        enemy.y += unity;
        yellowEnemy.x -= yunitx;
        yellowEnemy.y -= yunity;
    }
    stage.update(event);
}

function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
}

function setObstructionObject() {
    enemy = new createjs.Shape();
    enemy.graphics.beginFill("green").drawRect(0, 0, 50, 50);
    stage.addChild(enemy);

    enemy.x = parseInt(randomBetween(50, 400));
    enemy.y = parseInt(randomBetween(50, 400));

    yellowEnemy = new createjs.Shape();
    yellowEnemy.graphics.beginFill("yellow").drawRect(0,0, 50, 50);
    stage.addChild(yellowEnemy);

    yellowEnemy.x = parseInt(randomBetween(50, 400));
    yellowEnemy.y = parseInt(randomBetween(50, 400));

}
