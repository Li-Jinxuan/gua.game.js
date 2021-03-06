class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (let i = 1; i < 3; i++)
        {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0

        this.alive = true
    }

    static new(game) {
        return new this(game)
    }

    frames() {
        return this.animations[this.animationName]
    }

    jump() {
        this.vy = -10
        this.rotation = -90
    }

    update() {
        // 更新 alpha
        if (this.alpha > 0)
        {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        let h = 510
        if (this.y > h)
        {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45)
        {
            this.rotation += 45
        }
        // log('anim update', this.frameCount)
        this.frameCount--
        if (this.frameCount == 0)
        {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        if (this.alive)
        {
            let context = this.game.context
            context.save()

            let w2 = this.w / 2
            let h2 = this.h / 2
            context.translate(this.x + w2, this.y + h2)
            if (this.flipX)
            {
                context.scale(-1, 1)
            }
            context.globalAlpha = this.alpha

            context.rotate(this.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(this.texture, 0, 0)

            context.restore()
        }
    }

    kill() {
        this.alive = false
        let s = SceneTitle.new(this.game)
        this.game.replaceScene(s)
    }

    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        // log('keyStatus', keyStatus, this.flipX)
        // let animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // let name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }

    changeAnimation(name) {
        this.animationName = name
    }
}

// move(x, keyStatus) {
//     this.x += x
//     log('keyStatus', keyStatus)
//     if (keyStatus == 'down') {
//         this.changeAnimation('run')
//     } else if (keyStatus == 'up') {
//         this.changeAnimation('idle')
//     }
// }
// changeAnimation(name) {
//     this.animationName = name
// }

// // 只有一个动画的实现
// class GuaAnimation {
//     constructor(game) {
//         this.game = game
//         // 为了省事，在这里 hard code 一套动画
//         this.frames = []
//         for (let i = 1; i < 10; i++) {
//             let name = `w${i}`
//             let t = game.textureByName(name)
//             this.frames.push(t)
//         }
//         this.texture = this.frames[0]
//         this.frameIndex = 0
//         this.frameCount = 3
//     }
//     static new(game) {
//         return new this(game)
//     }
//     update() {
//         this.frameCount--
//         if (this.frameCount == 0) {
//             this.frameCount = 3
//             this.frameIndex = (this.frameIndex + 1) % this.frames.length
//             this.texture = this.frames[this.frameIndex]
//         }
//     }
//     draw() {
//         this.game.drawImage(this)
//     }
//     move(x) {
//         this.x += x
//     }
// }
