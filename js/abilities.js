
var Ability = function Ability (ability, effectTime, cooldown) {
    var cooldownTimeout, removeAbilityTimeout, cooldownTextInterval;

    this.init = function (callback, height) {
        this.resetTimeouts();
        this.active = false;
        this.effectTime = effectTime;
        this.ability = ability;
        this.cooldown = cooldown;
        this.cooldownExpired = true;

        this.abilityButton = new createjs.Shape();
        this.abilityButtonFillCommand = this.abilityButton.graphics.beginFill("#afec26").command;
        this.abilityButton.graphics.drawCircle(25, height, 20);
        this.abilityButton.on("click", function() { callback() });


        this.abilityButtonText = new createjs.Text(this.ability, "20px Courier", "#ffffff");
        this.abilityButtonText.x = 18;
        this.abilityButtonText.y = height+6;
        this.abilityButtonText.textBaseline = "alphabetic";

        stage.addChild(this.abilityButton);
        stage.addChild(this.abilityButtonText);
    };

    this.resetTimeouts = function (){
        if (cooldownTimeout) {
            clearTimeout(cooldownTimeout);
        }

        if (removeAbilityTimeout) {
            clearTimeout(removeAbilityTimeout);
        }

        if (cooldownTextInterval) {
            clearInterval(cooldownTextInterval);
        }
    };

    this.setCooldown = function () {
        var that = this;
        this.cooldownExpired = false;
        this.abilityButtonFillCommand.style = "#c3c3c3";
        cooldownTimeout = setTimeout(function cooldown() {
            that.abilityButtonFillCommand.style = "#afec26";
            that.cooldownExpired = true;
            that.abilityButtonText.text = that.ability;
            clearInterval(cooldownTextInterval);
        }, this.cooldown);
        var cooldown = this.cooldown / 1000;
        cooldownTextInterval = setInterval(function () {
            cooldown--;
            if (cooldown > 9 ) {
                that.abilityButtonText.x = 13;
            } else {
                that.abilityButtonText.x = 19;
            }
            that.abilityButtonText.text = cooldown;
        }, 1000)
    };

    this.executeAbility = function (remove) {
        var that = this;
        if (!this.cooldownExpired) {
            return;
        }
        this.setCooldown();
        this.active = true;
        var removeAbility = function removeAbility() {
            remove();
            that.active = false;
        };
        removeAbilityTimeout = setTimeout(removeAbility, this.effectTime);
    };

};

function checkAbilityQ(enemy) {
    if (abilityQ.active) {
        stage.addChildAt(playerAura, 0);
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