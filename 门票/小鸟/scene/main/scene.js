class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        // this.speed = 15
        this.speed = config.bullet_speed
    }

    update() {
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 0
    }

    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0)
        {
            this.cooldown--
        }
    }

    fire() {
        if (this.cooldown == 0)
        {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if (this.y > 600)
        {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600)
        {
            this.setup()
        }
    }

    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // let label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // bg
        let bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (let i = 0; i < 30; i++)
        {
            let g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        let b = GuaAnimation.new(game)
        b.x = 180
        b.y = 200
        this.bird = b
        this.addElement(b)
        //
        this.setupInputs()
    }

    static new(game) {
        let i = new this(game)
        return i
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        super.update()
        // 地面移动
        this.skipCount--
        let offset = -5
        if (this.skipCount == 0)
        {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 30; i++)
        {
            let g = this.grounds[i]
            g.x += offset
        }
        // 判断相撞
        for (const pipe of this.pipe.pipes)
        {
            if (isIntersect(this.bird, pipe))
            {
                this.bird.kill()
            }
        }
    }

    setupInputs() {
        let self = this
        let b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
