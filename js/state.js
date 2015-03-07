
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
    goal.x = Math.round(randomBetween(50, stage.canvas.width - goalSize * 5));
    goal.y = Math.round(randomBetween(50, stage.canvas.height - goalSize * 5));
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
