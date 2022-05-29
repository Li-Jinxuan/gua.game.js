class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            let s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 f 发射', 100, 210)
        this.game.context.fillText('按 123 切换关卡', 100, 230)
    }
}
