
function checkAbilityQ(enemy) {
    if (abilityQ) {
        if (checkIntersectionWithSize(enemy, player, playerSize * 3)) {
            enemy.unitX = -enemy.unitX;
            enemy.unitY = -enemy.unitY;
        }
    }
}
