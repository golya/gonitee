
var Ability = function Ability (effectTime, cooldown) {
    this.active = false;
    this.effectTime = effectTime;
    this.cooldown = cooldown;

    this.init = function (callback, height) {
        var ability = new createjs.Shape();
        ability.graphics.beginFill("#afec26").drawCircle(25, height, 20);
        ability.on("click", function() { callback() });
        stage.addChild(ability);
    }

};

function checkAbilityQ(enemy) {
    if (abilityQ.active) {
        if (checkIntersectionWithSize(enemy, player, playerSize * 3)) {
            enemy.unitX = -enemy.unitX;
            enemy.unitY = -enemy.unitY;
        }
    }
}

function checkAbilityW(enemy) {
    if (abilityW.active) {
        enemy.unitX = enemy.unitX/3;
        enemy.unitY = enemy.unitY/3;
    }
}

function checkAbilityE(enemy) {
    if (abilityE.active) {
        enemy.unitX = 0;
        enemy.unitY = 0;
    }
}

function checkAbilityR(enemy) {
    if (abilityR.active) {
        enemy.unitX = 0;
        enemy.unitY = 0;
    }
}

function resetAbilityW(enemies) {
    function setOriginalSpeed(enemy) {
        var signX = enemy.unitX > 0 ? 1 : -1;
        var signOrigX = enemy.OrigUnitX > 0 ? 1 : -1;
        var signY = enemy.unitY > 0 ? 1 : -1;
        var signOrigY = enemy.OrigUnitY > 0 ? 1 : -1;
        var OrigSpeedX = enemy.OrigUnitX;
        var OrigSpeedY = enemy.OrigUnitY;
        if (signX !== signOrigX) {
            OrigSpeedX *= -1;
        }
        if (signY !== signOrigY) {
            OrigSpeedY *= -1;
        }
        enemy.unitX = OrigSpeedX;
        enemy.unitY = OrigSpeedY;
    }

    for (var index in enemies) {
        setOriginalSpeed(enemies[index]);
    }
}