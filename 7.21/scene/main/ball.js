let Ball = function(game) {
    let o = game.imageByName('ball')
    // let image = imageFromPath('ball.png')
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired)
        {
            // log('move')
            if (o.x < 0 || o.x > 400)
            {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300)
            {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.反弹 = function() {
        o.speedY *= -1
    }
    o.hasPoint = function(x, y) {
        let xIn = x >= o.x && x <= o.x + o.w
        let yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
