var stage, player, playerAura, goal;
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

var sidebar = 50;

var levelState;
var levelTimeout;
var levelTime;
var level = 1;
var levelGoal = 10;

var abilityQ = new Ability('Q', 5000, 8000);
var abilityW = new Ability('W', 3000, 5000);
var abilityE = new Ability('E', 2000, 15000);
var abilityR = new Ability('R', 3000, 55000);

window.onresize = function() {
    var canvas = document.getElementById("game");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createMap();
};

function init() {
    if (stage) {
        stage.removeAllChildren();
        stage.update();
    }
    stage = new createjs.Stage("game");
    createjs.Touch.enable(stage);
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    initGameState();

    createMap();

    createGoal();
    createPlayer();
    createEnemies();

    abilityQ.init(executeAbilityQ, 50);
    abilityW.init(executeAbilityW, 100);
    abilityE.init(executeAbilityE, 150);
    abilityR.init(executeAbilityR, 200);

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

    levelTime = Math.floor(9 + Math.pow(level, 2) / 100);
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
    maxEnemySpeed = Math.round(window.innerWidth/200) + level/2;
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
