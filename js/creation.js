function createCatchText() {
    catchText = new createjs.Text("0", "50px Arial", "#000C26");
    catchText.x = 70;
    catchText.y = 100;
    catchText.textBaseline = "alphabetic";
    stage.addChild(catchText);
}

function createTimerText() {
    timerText = new createjs.Text("", "50px Arial", "#AFEC26");
    timerText.x = 150;
    timerText.y = 100;
    timerText.textBaseline = "alphabetic";
    stage.addChild(timerText);
}

function createLevelText() {
    levelText = new createjs.Text("", "50px Arial", "#AFE000");
    levelText.x = 70;
    levelText.y = 200;
    levelText.textBaseline = "alphabetic";
    stage.addChild(levelText);
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
    enemy.OrigUnitX = unitX;
    enemy.OrigUnitY = unitY;
    enemies.push(enemy);

    stage.addChild(enemy);

    enemy.x = Math.round(stage.canvas.width/2);
    enemy.y = Math.round(stage.canvas.height/2);

}

function createGoal() {
    goal = new createjs.Shape();
    goal.graphics.beginFill("#3a5b00").drawCircle(0, 0, goalSize);
    stage.addChild(goal);

    setGoalPosition();
}
