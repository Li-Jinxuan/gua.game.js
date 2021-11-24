let e = sel => document.querySelector(sel)

let log = console.log.bind(console)

let imageFromPath = function(path) {
    let img = new Image()
    img.src = path
    return img
}

let rectIntersects = function(a, b) {
    let o = a
    if (b.y > o.y && b.y < o.y + o.texture.height)
    {
        if (b.x > o.x && b.x < o.x + o.texture.width)
        {
            return true
        }
    }
    return false
}

const isIntersect = function(a, b) {
    return (a.alive && b.alive) && (rectIntersects(a, b) || rectIntersects(b, a))
}

const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
