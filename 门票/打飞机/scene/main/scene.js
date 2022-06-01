const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = config.bullet_speed
    }

    update() {
        this.y -= this.speed
    }
}

class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 5
    }

    update() {
        this.y += this.speed
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
        if (this.cooldown == 0 && this.alive)
        {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.scene.myBullets.push(b)
        }
    }

    kill() {
        this.alive = false
        let ps = GuaParticleSystem.new(this.game, this.x + this.w / 2, this.y + this.h / 2)
        this.scene.addElement(ps)
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
        this.cooldown = randomBetween(0, 100)
    }

    fire() {
        if (this.cooldown == 0)
        {
            this.cooldown = randomBetween(0, 100)
            let x = this.x + this.w / 2
            let y = this.y + this.h / 2
            let b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.scene.enemyBullets.push(b)
        }
    }

    kill() {
        this.alive = false
        let ps = GuaParticleSystem.new(this.game, this.x + this.w / 2, this.y + this.h / 2)
        this.scene.addElement(ps)
    }

    update() {
        this.y += this.speed
        if (this.y > 600)
        {
            this.setup()
        }
        if (this.cooldown > 0 && this.alive)
        {
            this.cooldown--
            this.fire()
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
        this.setup()
        this.setupInputs()
    }

    setup() {
        let game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')

        // this.player = GuaImage.new(this.game, 'player')
        // this.player.x = 100
        // this.player.y = 150
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 450

        this.myBullets = []

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.enemies = []
        this.addEnemies()

        this.enemyBullets = []

        // let ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
    }

    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++)
        {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
    }

    enemyMeetMyBullet(enemy) {
        for (const myBullet of this.myBullets)
        {
            if (isIntersect(myBullet, enemy))
            {
                myBullet.alive = false
                enemy.alive = false
                return true
            }
        }
        return false
    }

    enemyBulletMeetMyBullet(enemyBullet) {
        for (const myBullet of this.myBullets)
        {
            if (isIntersect(myBullet, enemyBullet))
            {
                myBullet.alive = false
                enemyBullet.alive = false
                return true
            }
        }
        return false
    }

    update() {
        super.update()
        this.cloud.y += 1

        for (const enemy of this.enemies)
        {
            if (isIntersect(enemy, this.player)) // 敌机与我机相撞
            {
                this.player.kill()
                enemy.kill()
                break
            }
            else if (this.enemyMeetMyBullet(enemy)) // 敌机与我机子弹相撞
            {
                enemy.kill()
                break
            }
        }

        for (const enemyBullet of this.enemyBullets)
        {
            if (isIntersect(enemyBullet, this.player)) // 敌机子弹与我机相撞
            {
                this.player.kill()
                enemyBullet.alive = false
                break
            }
            else if (this.enemyBulletMeetMyBullet(enemyBullet)) // 敌机子弹与我机子弹相撞
            {
                break
            }
        }
    }
}
