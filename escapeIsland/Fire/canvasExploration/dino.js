const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

// note top left corner is x = 0, y = 0

let score;
let highscore;
let scoreText;
let highscoreText
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

// event listener
document.addEventListener('keydown', function(event) {
    keys[event.code] = true
})
document.addEventListener('keyup', function(event) {
    keys[event.code] = false
} )

class Player {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c

        this.dy = 0
        this.jumpForce = 15
        this.originalHeight = h
        this.grounded = false
        this.jumpTimer = 0
    }
    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.fillRect(this.x, this.y,this.w, this.h)
        ctx.closePath()
    }
    animate = () => {
        // duck animation
        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.h = this.originalHeight/2
        }else {
            this.h = this.originalHeight
        }

        // jump animation
        if (keys['Space'] || keys['KeyUp']) {
            this.jump()
            console.log(this.jumpTimer)
            console.log(this.dy)
            console.log(this.y)
        } else {
            this.jumpTimer = 0
        }

        this.y += this.dy

        // gravity
        if (this.y + this.h < canvas.height) {
            this.dy = gravity
            this.grounded = false
        } else {
            this.dy = 0
            this.grounded = true
            this.y = canvas.height - this.h
        }

        this.draw()
    }
    jump = () => {
        if (this.grounded && this.jumpTimer === 0) {
            this.jumpTimer = 1
            // basically y - this.jumpForce
            this.dy = -this.jumpForce
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++
            this.dy = - this.jumpForce - (this.jumpTimer/50);
        }
    }
}
class Obstacle{
    constructor(x, y , w, h , c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c

        this.dx = -gameSpeed
    }

    update = () => {
        // shifts position towards player
        this.x += this.dx
        this.draw()
        this.dx = -gameSpeed
    }
    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.fillRect(this.x, this.y,this.w, this.h)
        ctx.closePath()
    }
}
class Text{
    constructor(t, x, y, w, a, c, s) {
        this.t = t
        this.x = x
        this.y = y
        this.w = w
        this.a = a
        this.c = c
        this.s = s
    }
    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.c
        ctx.font = this.s +"px sans-serif"
        ctx.textAlign = this.a
        ctx.fillText(this.t, this.x, this.y)
        ctx.closePath()
    }
}

function spawnObstacles() {
    let size = randomInt(20,70)
    console.log(size)
    let type = randomInt(0,1)
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#24248E4')

    if (type === 1) {
        obstacle.y -= player.originalHeight - 10
    }
    obstacles.push(obstacle)
}

function randomInt(min,max) {
    return Math.round(Math.random() * (max-min) + min)
}

function start() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    ctx.font = '20px sans-serif'
    gameSpeed = 3
    gravity = 3
    score = 0
    highscore = 0

    scoreText = new Text('Score:'+score,25,25,'left','#212121','20')

    player = new Player(25, 0, 50, 50,  '#FF5858');

    requestAnimationFrame(update)


}

let initialSpawnTimer = 200
let spawnTimer = initialSpawnTimer

function update() {
    requestAnimationFrame(update)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacles()
        // make spawnTimer responsive to game speed. faster game speed means spawn faster
        spawnTimer = initialSpawnTimer - gameSpeed * 8

        if (spawnTimer < 60) {
            spawnTimer = 60 
        }
    }
    
    // spawnEnemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i]
        o.update()

        if(o.x + o.width < 0) {
            obstacles.splice(i,1)
        }
        // collision detection
        if (
            player.x < o.x + o.w &&
            player.x + player.w > o.x &&
            player.y < o.y + o.h &&
            player.y + player.h > o.y
        ) {
            obstacles = []
            score = 0;
            spawnTimer = initialSpawnTimer
            gameSpeed = 3
        }
    }

    player.animate()
    gameSpeed += 0.003
    score++
    scoreText.t = 'Score:' + score;
    scoreText.draw()

}

start()