var stage, player;
var enemies = [];
var playerSize = 25;
var enemySize = 25;
var maxEnemySpeed = 8;
var numberOfEnemies = 8;

function init() {
    stage = new createjs.Stage("game");

    createPlayer();
    createEnemies();

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function createEnemies() {
    for (var i = 0; i < numberOfEnemies; i++) {
        createEnemy(
            getRandomColor(),
            randomBetween(-maxEnemySpeed, maxEnemySpeed), randomBetween(-maxEnemySpeed, maxEnemySpeed)
        );
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkIntersection(ball1, ball2) {
    var xDist = ball1.x - ball2.x;
    var yDist = ball1.y - ball2.y;

    var distance = Math.sqrt(xDist * xDist + yDist * yDist);
    return distance < enemySize + playerSize;
}

function setPlayerPosition(x, y) {
    player.x = x;
    player.y = y;
}

function handleTick(event) {

    function setEnemyMovement() {
        if (enemies[index].x > stage.canvas.width - enemySize || enemies[index].x < enemySize) {
            enemies[index].unitX = -enemies[index].unitX;
        }
        if (enemies[index].y > stage.canvas.height - enemySize || enemies[index].y < enemySize) {
            enemies[index].unitY = -enemies[index].unitY;
        }
        enemies[index].x += enemies[index].unitX;
        enemies[index].y += enemies[index].unitY;
    }

    if (!event.paused) {
        for (var index in enemies) {
            if (checkIntersection(enemies[index], player)) {
                createjs.Ticker.setPaused(true);
                setPlayerPosition(0, 0);
            }
            setEnemyMovement();
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

function createPlayer() {
    player = new createjs.Shape();
    player.graphics.beginFill("#000").drawCircle(0, 0, playerSize);
    stage.addChild(player);

    stage.on("stagemouseup", function (evt) {
        setPlayerPosition(evt.stageX, evt.stageY);
    });
}

function createEnemy(color, unitX, unitY) {
    unitY = unitY || 5;
    unitX = unitX || 5;
    color = color || "green";
    var enemy = new createjs.Shape();
    enemy.graphics.beginFill(color).drawCircle(0, 0, enemySize);
    enemy.unitX = unitX;
    enemy.unitY = unitY;
    enemies.push(enemy);

    stage.addChild(enemy);

    enemy.x = parseInt(randomBetween(50, stage.canvas.width-enemySize*3));
    enemy.y = parseInt(randomBetween(50, stage.canvas.height-enemySize*3));
}
