var stage, player, goal;
var enemies;
var playerSize;
var goalSize;
var enemySize;
var maxEnemySpeed;
var numberOfEnemies;
var catchNumber;

var abilityQ = new Ability(5000, 8000);
var abilityW = new Ability(3000, 5000);
var abilityE = new Ability(2000, 15000);

function initGameState() {
    enemies = [];
    playerSize = 25;
    goalSize = 15;
    enemySize = 25;
    maxEnemySpeed = 8;
    numberOfEnemies = 4;
    catchNumber = 0;
    setCatchNumber(catchNumber);
    createjs.Ticker.setPaused(false);
}

function init() {
    stage = new createjs.Stage("game");

    initGameState();

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
            abilityQ.active = true;
            setTimeout(function removeAbility() {
                abilityQ.active = false;
            }, abilityQ.effectTime);
            break;
        case 87:
            abilityW.active = true;
            setTimeout(function removeAbility() {
                abilityW.active = false;
                resetAbilityW(enemies);
            }, abilityW.effectTime);
            break;
        case 69:
            abilityE.active = true;
            setTimeout(function removeAbility() {
                abilityE.active = false;
                resetAbilityW(enemies);
            }, abilityE.effectTime);
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

function setCatchNumber(value) {
    var catchNumberElement = document.getElementById('catch-number');
    catchNumberElement.innerHTML = value.toString();
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
            catchNumber += 1;
            setCatchNumber(catchNumber);
            setGoalPosition();
        }
    }

    function setEnemyMovement(enemy) {
        checkAbilityQ(enemy);
        checkAbilityW(enemy);
        checkAbilityE(enemy);
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
        abilityW.active = false;
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