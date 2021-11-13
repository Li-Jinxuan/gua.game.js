class GuaAnimation {
    constructor(game, animation) {
        let a = animation
        this.game = game
        this.animations = {}
        for (let action of a.actions) {
            this.animations[action.name] = []
            for (let i = 0; i < action.numberOfFrames; i++) {
                let index = '0'.repeat(String(action.numberOfFrames).length - String(i).length) + String(i)
                let key = a.name + action.name + index
                let t = game.textureByName(key)
                this.animations[action.name].push(t)
            }
        }
        this.animationName = a.actions[0].name
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = this.frames().length
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
    }
    static new(...args) {
        return new this(...args)
    }
    frames() {
        return this.animations[this.animationName]
    }
    updateFrame() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    update() {
        this.updateFrame()
    }
    draw() {
        let context = this.game.context
        context.save()

        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha

        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
