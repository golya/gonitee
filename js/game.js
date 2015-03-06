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

function initScreen() {
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
    initScreen();
    levelState = 'started';
    enemies = [];
    playerSize = Math.round(window.innerWidth*0.035);
    goalSize = Math.round(window.innerWidth*0.025);
    enemySize = Math.round(window.innerWidth*0.035);
    maxEnemySpeed = Math.round(window.innerWidth/200); + level/4;
    numberOfEnemies = 1 + level/2;
    catchNumber = 0;

    createCatchText();
    setCatchNumber(catchNumber);

    createjs.Ticker.setPaused(false);
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

function checkGoal() {
    if (checkIntersection(goal, player)) {
        catchNumber += 1;
        setCatchNumber(catchNumber);
        setGoalPosition();
    }
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
