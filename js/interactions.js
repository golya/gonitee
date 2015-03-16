
function keyPressed(event) {
    switch(event.keyCode) {
        case 81:
            executeAbilityQ();
            break;
        case 87:
            executeAbilityW();
            break;
        case 69:
            executeAbilityE();
            break;
        case 82:
            executeAbilityR();
            break;
    }
    stage.update();
}

function executeAbilityQ() {
    var removeAbility = function removeAbility() {
        stage.removeChild(playerAura);
    };
    abilityQ.executeAbility(removeAbility);
}

function executeAbilityW() {
    var removeAbility = function removeAbility() {
        resetAbilityW(enemies);
    };
    abilityW.executeAbility(removeAbility);
}

function executeAbilityE() {
    var removeAbility = function removeAbility() {
        resetAbilityW(enemies);
    };
    abilityE.executeAbility(removeAbility);
}

function executeAbilityR() {
    abilityR.executeAbility(function(){});
}