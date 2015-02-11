var stage, player, goal;
var enemies = [];
var playerSize = 25;
var goalSize = 15;
var enemySize = 25;
var maxEnemySpeed = 8;
var numberOfEnemies = 8;

var abilityQ = false;
var effectTimeQ = 3000;

var abilityW = false;
var effectTimeW = 3000;

var catchNumber = 0;

function init() {
    stage = new createjs.Stage("game");

    createGoal();
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
        case 87:
            abilityW = true;
            setTimeout(function removeAbility() {
                abilityW = false;
                resetAbilityW(enemies);
            }, effectTimeW);
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

    function setBasicMovement(target, size) {
        if (target.x > stage.canvas.width - size || target.x < size) {
            target.unitX = -target.unitX;
        }
        if (target.y > stage.canvas.height - size || target.y < size) {
            target.unitY = -target.unitY;
        }
        target.x += target.unitX;
        target.y += target.unitY;
    }

    function checkGoal() {
        if (checkIntersection(goal, player)) {
            var catchNumberElement = document.getElementById('catch-number');
            catchNumber += 1;
            catchNumberElement.innerHTML = catchNumber.toString();
            setGoalPosition();
        }
    }

    function setEnemyMovement(enemy) {
        checkAbilityQ(enemy);
        checkAbilityW(enemy);
        setBasicMovement(enemy, enemySize);
    }

    if (!event.paused) {
        for (var index in enemies) {
            if (checkIntersection(enemies[index], player)) {
                createjs.Ticker.setPaused(true);
            }
            setEnemyMovement(enemies[index]);
            checkGoal();
        }
        abilityW = false;
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

function setGoalPosition() {
    goal.x = parseInt(randomBetween(50, stage.canvas.width - goalSize * 3));
    goal.y = parseInt(randomBetween(50, stage.canvas.height - goalSize * 3));
}

function createGoal() {
    goal = new createjs.Shape();
    goal.graphics.beginFill("#3a5b00").drawCircle(0, 0, goalSize);
    stage.addChild(goal);

    setGoalPosition();
}

function createEnemy(color, unitX, unitY) {
    unitY = unitY || 5;
    unitX = unitX || 5;
    color = color || "green";
    var enemy = new createjs.Shape();
    enemy.graphics.beginFill(color).drawCircle(0, 0, enemySize);
    enemy.unitX = unitX;
    enemy.unitY = unitY;
    enemy.OrigUnitX = unitX;
    enemy.OrigUnitY = unitY;
    enemies.push(enemy);

    stage.addChild(enemy);

    enemy.x = parseInt(randomBetween(50, stage.canvas.width-enemySize*3));
    enemy.y = parseInt(randomBetween(50, stage.canvas.height-enemySize*3));
}