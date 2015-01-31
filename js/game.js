var stage;
var enemies = [];
var playerSize = 50;
var enemySize = 50;

function init() {
    stage = new createjs.Stage("game");

    createPlayer();
    createEnemies();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function createEnemies() {
    for (var i = 0; i < 6; i++) {
        createEnemy(getRandomColor(), randomBetween(-8, 8), randomBetween(-8, 8));
    }
}

function createPlayer() {
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#000").drawRect(0, 0, playerSize, playerSize);
    stage.addChild(rect);

    stage.on("stagemouseup", function (evt) {
        rect.x = evt.stageX;
        rect.y = evt.stageY;
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleTick(event) {
    if (!event.paused) {

        for (var index in enemies) {
            if (enemies[index].x > stage.canvas.width-enemySize || enemies[index].x < 0 ) {
                enemies[index].unitX = -enemies[index].unitX;
            }
            if (enemies[index].y > stage.canvas.height-enemySize || enemies[index].y < 0 ) {
                enemies[index].unitY = -enemies[index].unitY;
            }
            enemies[index].x += enemies[index].unitX;
            enemies[index].y += enemies[index].unitY;
        }
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

function createEnemy(color, unitX, unitY) {
    unitY = unitY || 5;
    unitX = unitX || 5;
    color = color || "green";
    var enemy = new createjs.Shape();
    enemy.graphics.beginFill(color).drawRect(0, 0, enemySize, enemySize);
    enemy.unitX = unitX;
    enemy.unitY = unitY;
    enemies.push(enemy);
    stage.addChild(enemy);

    enemy.x = parseInt(randomBetween(50, stage.canvas.width-enemySize*2));
    enemy.y = parseInt(randomBetween(50, stage.canvas.height-enemySize*2));
}
