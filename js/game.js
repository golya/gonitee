var stage, player, goal;
var enemies;
var playerSize;
var goalSize;
var enemySize;
var maxEnemySpeed;
var numberOfEnemies;
var catchNumber;
var catchText;
var timerText;
var levelText;

var levelState;
var levelTimeout;
var levelTime;
var level = 1;
var levelGoal = 10;

var abilityQ = new Ability(5000, 8000);
var abilityW = new Ability(3000, 5000);
var abilityE = new Ability(2000, 15000);
var abilityR = new Ability(2000, 95000);

window.onresize = function() {
    var canvas = document.getElementById("game");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createMap();
};

function init() {
    stage = new createjs.Stage("game");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    initGameState();

    createMap();

    createGoal();
    createPlayer();
    createEnemies();

    this.document.onkeydown = keyPressed;

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);
}

function initHeader() {
    createTimerText();
    createLevelText();

    if (levelTimeout) {
        clearInterval(levelTimeout);
    }

    levelTime = Math.floor(8 + Math.pow(level, 2) / 100);
    timerText.text = levelTime.toString();
    levelText.text = level.toString();

    levelTimeout = setInterval(function () {
        timerText.text = levelTime.toString();
        levelTime--;
    }, 1000);
}

function initGameState() {
    initHeader();
    levelState = 'started';
    enemies = [];
    playerSize = Math.round(window.innerWidth*0.035);
    goalSize = Math.round(window.innerWidth*0.025);;
    enemySize = Math.round(window.innerWidth*0.035);;
    maxEnemySpeed = Math.round(window.innerWidth/200); + level/4;
    numberOfEnemies = 1 + level/2;
    catchNumber = 0;

    createCatchText();
    setCatchNumber(catchNumber);

    createjs.Ticker.setPaused(false);
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
    catchText.text = value;
}

function checkWallCollisionX(target, size) {
    if ((target.x - size <= 60) || (target.x + size >= window.innerWidth-10)) {
        return true;
    }
    return false;
}

function checkWallCollisionY(target, size) {
    if ((target.y - size <= 10) || (target.y + size >= window.innerHeight-10)) {
        return true;
    }
    return false;
}

function setBasicMovement(target, size) {
    if (target.x > stage.canvas.width - size || target.x < size || checkWallCollisionX(target, size)) {
        target.unitX = -target.unitX;
    }
    if (target.y > stage.canvas.height - size || target.y < size || checkWallCollisionY(target, size)) {
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
    checkAbilityR(enemy);
    setBasicMovement(enemy, enemySize);
}

function checkEnemies() {
    for (var index in enemies) {
        if (checkIntersection(enemies[index], player)) {
            createjs.Ticker.setPaused(true);
            levelState = 'paused';
        }
        setEnemyMovement(enemies[index]);
        checkGoal();
    }
}

function handleTick(event) {
    if (!event.paused) {
        checkEnemies();
        abilityW.active = false;

        if (levelState === 'paused' || levelTime < 0 ) {
            clearInterval(levelTimeout);
            init();
        }
        if (catchNumber >= levelGoal) {
            clearInterval(levelTimeout);
            createjs.Ticker.setPaused(true);
            level ++;
            init();
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


function setGoalPosition() {
    goal.x = Math.round(randomBetween(50, stage.canvas.width - goalSize * 5));
    goal.y = Math.round(randomBetween(50, stage.canvas.height - goalSize * 5));
}
