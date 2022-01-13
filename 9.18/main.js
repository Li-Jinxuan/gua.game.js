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

let GuaAddAnimation = (images, animation) => {
    let a = animation
    let pathFormat = a.pathFormat
    let keyName = a.name
    for (let action of a.actions)
    {
        let name = action.name
        let numberOfFrames = action.numberOfFrames
        log('actions', action)
        // pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
        let p = pathFormat.replace('[action]', name).replace('[action]', name)
        for (let i = 0; i < numberOfFrames; i++)
        {
            let index = '0'.repeat(String(numberOfFrames).length - String(i).length) + String(i)
            // let path = `${p}${index}`
            let key = keyName + name + index
            let value = p.replace('[index]', index)
            images[key] = value
        }
    }
}

let __main = function() {
    // plant
    let animationPeashooter = {
        name: 'peashooter',
        pathFormat: 'img/peashooter/[action]/peashooter_[action]_[index].png',
        actions: [
            {
                name: 'idle',
                numberOfFrames: 13,
            },
        ]
    }

    // zombie
    let animationZombie = {
        name: 'bhzombie',
        // zombie/attack
        pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
        actions: [
            {
                name: 'walking',
                numberOfFrames: 15,
            },
            {
                name: 'attack',
                numberOfFrames: 11,
            },
        ]
    }
    let images = {
        bg1: 'img/background1.jpg',
        peabullet1: 'img/peabullet1.gif',
    }
    //
    GuaAddAnimation(images, animationZombie)
    GuaAddAnimation(images, animationPeashooter)
    // log('images', images)

    let game = GuaGame.instance(30, images, function(g) {
        // let s = Scene.new(g)
        // log('scene title', typeof SceneTitle)
        let s = SceneTitle.new(g)
        // let s = SceneEditor.new(g)
        g.runWithScene(s)
    })
}

__main()
