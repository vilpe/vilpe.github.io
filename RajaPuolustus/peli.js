const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth -= 50
canvas.height = 900

const solttu = new Image()
solttu.src = "solttu.png"
const ak = new Image()
ak.src = "ak.png"

class Player {
    constructor(x,y,color) {
        this.x = x
        this.y = y
        this.color = color
    }
    draw(x,y) {
        c.beginPath() 
        c.rect(x,y,10,100)
        c.fillStyle = this.color
        c.fill()
        c.drawImage(solttu,(x-30),(y-5),100,130)
    }
    update() {
        this.x = newX
    }
}
class PlayerProjectile {
    constructor(x,y,radius,color,velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath() //aloittaa pirron
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.x = this.x + this.velocity.x
    }
}
class EnemyProjectile {
    constructor(x,y,radius,color,velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        c.beginPath() //aloittaa pirron
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.x = this.x - this.velocity.x
    }
}
class Enemy {
    constructor(x,y,color) {
        this.x = x
        this.y = y
        this.color = color
    }
    draw() {
        c.beginPath() 
        c.rect(this.x,this.y,20,50)
        c.fillStyle = this.color
        c.fill()
        c.beginPath()
        c.rect(this.x+5,this.y-10,10,10)
        c.fillStyle = 'red'
        c.fill()
        c.drawImage(ak,(this.x-30),(this.y+20),50,30)
    }
    update() {
        if(this.x > canvas.width - 300) {
            this.x -= 0.5
            c.font = "48px serif"
            c.fillText('uraa',this.x,this.y-10)
        } else {
            if(this.x = canvas.width - 300) {
                c.font = "48px serif"
                c.fillText('',this.x,this.y-20)
            }
        }

    }
}
class movingText {
    constructor(x,y,text) {
        this.x = x
        this.y = y
        this.text = text
    }
    draw() {
        c.font ="50px serift"
        c.fillText(this.text,this.x,this.y)
        this.y += 1
    }
}


//init
let round = 0
let roundEl = document.getElementById('roundEl')
roundEl.innerHTML = round

const pelaaja = new Player(canvas.width/2,canvas.height/2,'red')
const startText = new movingText(canvas.width/2,0,`Puolusta!!!`)
let game = false
let startButton = document.getElementById('startButton')
const projectiles = []
const enemyProjectiles = []
const enemies = []
let score = 0
let scoreEl = document.getElementById('scoreEl')
scoreEl.innerHTML = score

let health = 100;
let healthEl = document.getElementById('healthEl')
healthEl.innerHTML = health

const pelX = canvas.width/10
let pelY = canvas.height/2

let ammo = 10
let ammoEl = document.getElementById('ammoEl')
ammoEl.innerHTML = ammo

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)
    pelaaja.draw(pelX,pelY)

    projectiles.forEach((proj,index) => {
        proj.draw()
        proj.update()
        for (let i=0;i<enemies.length;i++) {
            let dist = Math.hypot(proj.x-enemies[i].x,proj.y-enemies[i].y)
            if(dist - proj.radius - 20 < 1) {
                enemies.splice(i,1)
                projectiles.splice(index,1)
                scoreEl.innerHTML = score += 1
            }
        }
        
    })
    enemies.forEach((vihu,index) => {
        vihu.draw()
        vihu.update()
    })
    startText.draw()
    enemyProjectiles.forEach(shot => {
        shot.draw()
        shot.update()
        let pdist = Math.hypot(shot.x-pelX,shot.y-pelY-20)
        if(pdist - 10 - shot.radius < 10) {
            //console.log(pdist)
            /*
                Korjaa että tämä tapahtuun vain kerran
            */
            healthEl.innerHTML = health -= 1
        }
    })
    if (health < 0) {
        window.close()
    }
}

addEventListener('keydown', (event) => {
    //console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            if (pelY === 0) {
                pelY = pelY
                break
            } else {
                pelY -= 10
                break
            }
        case 'ArrowDown':
            if (pelY === 800) {
                pelY = pelY
                break
            } else {
                pelY += 10
                break
            }
        case 'ArrowRight':
            if (ammo > 0) {
                const pelBullet = new PlayerProjectile(pelX,pelY+30,10,'black',{x:10})
                projectiles.push(pelBullet)
                ammoEl.innerHTML = ammo-=1
                console.log(ammo)
                break
            } else {
                console.log('ammukset loppu')
                break
            }
    }
})
function ammoAdder() {
    setInterval(() => {
        if (ammo < 10) {
            ammo++
            ammoEl.innerHTML = ammo
        } else if (ammo === 10) {
            console.log('ammo full')
        }
    }, 5000)
}
function randomEnemyPoint() {
    const i = Math.ceil(Math.random()*enemies.length)
    return enemies[i]

}
function spawnEnemies() {
    setInterval(() => {
        round = Math.floor(score/10)
        roundEl.innerHTML = round
        const newEnemy = new Enemy(canvas.width+300,Math.random()*canvas.height,'green')
        enemies.push(newEnemy)
    }, 5000-round*2000)
    setInterval(() => {
        const randE = randomEnemyPoint()
        const newShot = new EnemyProjectile(randE.x,randE.y+15,5,'red',{x:1})
        enemyProjectiles.push(newShot)
    },3000-round*2000)
}


if(game = true) {
    animate()
    ammoAdder()
    spawnEnemies()
}
