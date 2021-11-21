class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        return new this(game, text)
    }

    draw() {
        // log('draw label', this.game, this.text)
        this.game.context.fillText(this.text, 100, 190)
    }

    update() {
    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 20
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }

    static new(game, x, y) {
        return new this(game, x, y)
    }

    setup() {
        this.duration = 1
        this.numberOfParticles = 1
        this.particles = []
    }

    update() {
        this.duration--
        // 添加小火花
        if (this.particles.length < this.numberOfParticles)
        {
            let p = GuaParticle.new(this.game)
            // 设置初始化坐标
            let s = 2
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (let p of this.particles)
        {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        if (this.duration < 0)
        {
            // TODO, 这是一个临时的方案
            // 应该从 scene 中删除自己才对
            return
        }
        for (let p of this.particles)
        {
            p.draw()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        let ps = GuaParticleSystem.new(game)
        this.addElement(ps)
    }
}
