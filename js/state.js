
function setPlayerPosition(x, y) {
    player.x = x;
    player.y = y;
}

function setCatchNumber(value) {
    catchText.text = value;
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

function setEnemyMovement(enemy) {
    checkAbilityQ(enemy);
    checkAbilityW(enemy);
    checkAbilityE(enemy);
    checkAbilityR(enemy);
    setBasicMovement(enemy, enemySize);
}

function setGoalPosition() {
    var distanceX = (stage.canvas.width / 2) * 0.9;
    var distanceY = (stage.canvas.height / 2) * 0.9;
    var x = randomBetween(-distanceX, distanceX);
    var y = randomBetween(-distanceY, distanceY);
    goal.x = (stage.canvas.width / 2) - Math.round(x);
    if (goal.x < sidebar + 30 ) {
        goal.x = sidebar + 30;
    }
    goal.y = (stage.canvas.height / 2) - Math.round(y);
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
