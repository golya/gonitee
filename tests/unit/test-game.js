describe("Player position", function() {
    it("should be at zero", function() {
        stage = new createjs.Stage();
        spyOn(stage, 'addChild');

        createPlayer();
        expect(player.x).toEqual(0);
        expect(player.y).toEqual(0);
        expect(stage.addChild).toHaveBeenCalled();
    });
});