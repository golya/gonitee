function init() {
    var stage = new createjs.Stage("game");

    var rect = new createjs.Shape();
    rect.graphics.beginFill("#000").drawRect(10, 10, 50, 50);
    stage.addChild(rect);

    stage.on("stagemouseup", function(evt) {
        rect.x = evt.stageX;
        rect.y = evt.stageY;
        stage.update();
    });

    stage.update();
}

