const canvas = document.querySelector('canvas')
//context on canvasin 2d piirrettävät asiat
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
//kuvat pitää initalisoida
const song = new Audio
song.src = 'tyyris.mp3'
song.muted = false
const tyyris = new Image()
tyyris.src = 'egg.png'
const bg = new Image()
bg.src = 'wall.jpg'
let gameOn = false

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
        c.drawImage(tyyris,(x-50),(y-50),100,130)
    }
    update() {
        this.x = newX
    }
}
class Rock {
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
const friction = 0.97
class Particle {
    constructor(x,y,radius,color,velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath() //aloittaa pirron
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update() {
        this.draw()
        this.velocity.x *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}
//puoliväli sijoitukselle
const x = canvas.width / 2
const y = canvas.height*0.90
let newX = x
const muna = new Player(x,y,40,'blue')
//const proj = new Projectile(100,0,20,'red',{x:1,y:1})
const projectiles = []
const particles = []
let score = 0;
const startButton = document.getElementById('startButton')
const startDiv = document.getElementById('startDiv')


function spawnDrops () {
    setInterval(() => {
        const newProj = new Projectile((Math.random()*innerWidth),30,Math.random()*50,`hsl(${Math.random()*360},50%,50%)`,{x:1,y:Math.random()*10})
        projectiles.push(newProj)
    }, 1000)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(bg,0,0,innerWidth,innerHeight)
    //c.fillStyle = ('rgba(0 ,0 ,0 ,0.1)') tausta jossa likkeillä on jälki
    //c.fillRect(0,0,canvas.width,canvas.height)
    muna.draw(newX,y)
    muna.update()
    particles.forEach((particle,index) => {
        if (particle.alpha <= 0) {
            particles.splice(index,1)
        } else {
            particle.update()
        }
    })
    projectiles.forEach((proj,index) => {
        proj.draw()
        proj.update()
        //osuman tunnistus
        const dist = Math.hypot(proj.x - muna.x, proj.y - muna.y)
        if (dist - muna.radius - proj.radius < 1) {
            for (let i = 0; i < proj.radius; i++) {
                particles.push(
                    new Particle(proj.x,proj.y,Math.random()*10,proj.color,{
                        x: Math.random() - 1,
                        y: Math.random() - 0.5
                    })
                )
            }
            score += 1
            document.getElementById('scoreEl').innerHTML = score
            //console.log(score)
            setTimeout(() => {
                //proj ei välky kun odotetaan sekuntti
                projectiles.splice(index,1)    
            },0)
        }
        if (proj.y - proj.radius > innerHeight) {
            setTimeout(() => {
                //proj ei välky kun odotetaan sekuntti
                projectiles.splice(index,1)    
            },0)
        }
    })
    
}


window.addEventListener('click', (event) => {
    /*
    console.log(event) eventti tietoja kuten hiiren paikkka ctrl? jne
    */
   if(gameOn) {
    newX = event.clientX
    //let newY = event.clientY 
    muna.draw(newX,y)
   } 
})


document.getElementById('score').style.display = 'none'
startButton.addEventListener('click',() => {
    gameOn = true
    muna.draw(x,y)
    animate()
    spawnDrops()
    document.getElementById('startDiv').style.display = 'none'
    document.getElementById('score').style.display = 'inline'
    song.play()
})