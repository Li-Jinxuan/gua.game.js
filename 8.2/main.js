let loadLevel = function(game, n) {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++)
    {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

let enableDebugMode = function(game, enable) {
    if (!enable)
    {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        let k = event.key
        if (k == 'p')
        {
            // 暂停功能
            window.paused = !window.paused
        }
        else if ('1234567'.includes(k))
        {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        let input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

let __main = function() {
    let images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'fire.png',
        // w1: 'img/walking/w1.png',
        // w2: 'img/walking/w2.png',
        // w3: 'img/walking/w3.png',
        // w4: 'img/walking/w4.png',
        // w5: 'img/walking/w5.png',
        // w6: 'img/walking/w6.png',
        // w7: 'img/walking/w7.png',
        // w8: 'img/walking/w8.png',
        // w9: 'img/walking/w9.png',
        // 多状态动画
        // 闲置
        idle1: 'img/player-idle/player-idle-1.png',
        idle2: 'img/player-idle/player-idle-2.png',
        idle3: 'img/player-idle/player-idle-3.png',
        idle4: 'img/player-idle/player-idle-4.png',
        // 跑动
        run1: 'img/player-run/player-run-1.png',
        run2: 'img/player-run/player-run-2.png',
        run3: 'img/player-run/player-run-3.png',
        run4: 'img/player-run/player-run-4.png',
        run5: 'img/player-run/player-run-5.png',
        run6: 'img/player-run/player-run-6.png',
        run7: 'img/player-run/player-run-7.png',
        run8: 'img/player-run/player-run-8.png',
        run9: 'img/player-run/player-run-9.png',
        run10: 'img/player-run/player-run-10.png',
        //
        cave: 'img/cave.png',
        // flappy bird images
        bg: 'bird/bg.png',
        ground: 'bird/ground.png',
        b1: 'bird/b1.png',
        b2: 'bird/b2.png',
        b3: 'bird/b3.png',
    }
    let game = GuaGame.instance(30, images, function(g) {
        // let s = Scene.new(g)
        let s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
