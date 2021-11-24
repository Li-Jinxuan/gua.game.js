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
        // flappy bird images
        pipe: 'bird/pipe.png',
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
