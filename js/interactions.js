
function keyPressed(event) {
    switch(event.keyCode) {
        case 81:
            abilityQ.active = true;
            setTimeout(function removeAbility() {
                abilityQ.active = false;
            }, abilityQ.effectTime);
            break;
        case 87:
            abilityW.active = true;
            setTimeout(function removeAbility() {
                abilityW.active = false;
                resetAbilityW(enemies);
            }, abilityW.effectTime);
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