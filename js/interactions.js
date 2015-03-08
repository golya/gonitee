
function keyPressed(event) {
    switch(event.keyCode) {
        case 81:
            executeAbilityQ();
            break;
        case 87:
            executeAbilityE();
            break;
        case 69:
            abilityE.active = true;
            setTimeout(function removeAbility() {
                abilityE.active = false;
                resetAbilityW(enemies);
            }, abilityE.effectTime);
            break;
        case 82:
            abilityR.active = true;
            setTimeout(function removeAbility() {
                abilityR.active = false;
            }, abilityR.effectTime);
            break;
    }
    stage.update();
}

function executeAbilityQ() {
    abilityQ.active = true;
    setTimeout(function removeAbility() {
        abilityQ.active = false;
    }, abilityQ.effectTime);
}

function executeAbilityE() {
    abilityW.active = true;
    setTimeout(function removeAbility() {
        abilityW.active = false;
        resetAbilityW(enemies);
    }, abilityW.effectTime);
}