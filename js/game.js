var stage, player;
var enemies = [];
var playerSize = 25;
var enemySize = 25;
var maxEnemySpeed = 8;
var numberOfEnemies = 8;

var abilityQ = false;
var effectTimeQ = 3000;

function init() {
    stage = new createjs.Stage("game");

    createPlayer();
    createEnemies();

    this.document.onkeydown = keyPressed;

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function keyPressed(event) {
    switch(event.keyCode) {
        case 81:
            abilityQ = true;
            setTimeout(function removeAbility() {
                abilityQ = false;
            }, effectTimeQ);
            break;
    }
    stage.update();
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
    return checkIntersectionWithSize(ball1, ball2, playerSize);
}

function checkIntersectionWithSize(ball1, ball2, size) {
    var xDist = ball1.x - ball2.x;
    var yDist = ball1.y - ball2.y;

    var distance = Math.sqrt(xDist * xDist + yDist * yDist);
    return distance < enemySize + size;
}

function setPlayerPosition(x, y) {
    player.x = x;
    player.y = y;
}

function handleTick(event) {

    function checkAbilityQ(enemy) {
        if (abilityQ) {
            if (checkIntersectionWithSize(enemies[index], player, playerSize * 3)) {
                enemy.unitX = -enemy.unitX;
                enemy.unitY = -enemy.unitY;
            }
        }
    }

    function checkBasicMovement(enemy) {
        if (enemy.x > stage.canvas.width - enemySize || enemy.x < enemySize) {
            enemy.unitX = -enemy.unitX;
        }
        if (enemy.y > stage.canvas.height - enemySize || enemy.y < enemySize) {
            enemy.unitY = -enemy.unitY;
        }
        enemy.x += enemy.unitX;
        enemy.y += enemy.unitY;
    }

    function setEnemyMovement(enemy) {
        checkAbilityQ(enemy);
        checkBasicMovement(enemy);
    }

    if (!event.paused) {
        for (var index in enemies) {
            if (checkIntersection(enemies[index], player)) {
                createjs.Ticker.setPaused(true);
            }
            setEnemyMovement(enemies[index]);
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