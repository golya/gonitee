
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
    abilityQ.active = true;
    setTimeout(function removeAbility() {
        stage.removeChild(playerAura);
        abilityQ.active = false;
    }, abilityQ.effectTime);
}

function executeAbilityW() {
    abilityW.active = true;
    setTimeout(function removeAbility() {
        abilityW.active = false;
        resetAbilityW(enemies);
    }, abilityW.effectTime);
}

function executeAbilityE() {
    abilityE.active = true;
    setTimeout(function removeAbility() {
        abilityE.active = false;
        resetAbilityW(enemies);
    }, abilityE.effectTime);
}

function executeAbilityR() {
    abilityR.active = true;
    setTimeout(function removeAbility() {
        abilityR.active = false;
    }, abilityR.effectTime);
}