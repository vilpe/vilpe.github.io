const canvas = document.querySelector('canvas')
//context on canvasin 2d piirrettävät asiat
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
//kuvat pitää initalisoida
const tyyris = new Image()
tyyris.src = 'egg.png'

class Player {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(x,y) {
        //c.clearRect(0, 0, canvas.width, canvas.height);
        c.beginPath() //aloittaa pirron
        c.arc(x, y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.drawImage(tyyris,(x-50),(y-50),100,100)
    }
    update() {
        this.x = newX
    }
}
class Projectile {
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
        //this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}
//puoliväli sijoitukselle
const x = canvas.width / 2
const y = canvas.height / 2
let newX = x
const muna = new Player(x,y,50,'blue')
//const proj = new Projectile(100,0,20,'red',{x:1,y:1})
const projectiles = []
muna.draw(x,y)

function spawnDrops () {
    setInterval(() => {
        const newProj = new Projectile((Math.random()*innerWidth),0,30,'red',{x:1,y:1})
        projectiles.push(newProj)
    }, 1000)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    muna.draw(newX,y)
    muna.update()
    projectiles.forEach((proj) => {
        proj.draw()
        proj.update()
    })
    
}

window.addEventListener('click', (event) => {
    /*
    console.log(event) eventti tietoja kuten hiiren paikkka ctrl? jne
    */
    newX = event.clientX
    //let newY = event.clientY 
    muna.draw(newX,y)
})

animate()
spawnDrops()