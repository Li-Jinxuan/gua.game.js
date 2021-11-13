class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello from gua')
        this.addElement(label)

        // cave bg
        let cave = GuaImage.new(game, 'cave')
        this.addElement(cave)
        // player
        let w = GuaAnimation.new(game)
        w.x = 100
        w.y = 450
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        let self = this
        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
}
