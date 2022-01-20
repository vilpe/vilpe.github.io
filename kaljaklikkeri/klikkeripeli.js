const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth/2
canvas.height= innerHeight

//kuvat
const o1 = new Image()
o1.src = './kaljat/1.png'
const o2 = new Image()
o2.src = './kaljat/2.png'
const o3 = new Image()
o3.src = './kaljat/3.png'
const kuvat = [o1,o2,o3]

class Olut {
    constructor(x,y,color,image) {
        this.x = x
        this.y = y
        this.color = color
        this.image = image
    }
    draw() {
        c.beginPath() 
        c.rect(this.x,this.y,100,100)
        c.fillStyle = this.color
        c.fill()
        c.drawImage(this.image,this.x,this.y,100,100)
    }
    update() {
        this.y += 1
    }
}

const oluet = []
let raha = 10;
let rahaEl = document.getElementById('rahaEl')
rahaEl.innerHTML = raha

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)
    oluet.forEach((olut,index) => {
        olut.draw()
        olut.update()
        if(olut.y > canvas.height) {
            oluet.splice(index,1)
        }
    })

}
function spawnOlut() {
    setInterval(() => {
        const newOlut = new Olut(Math.random()*canvas.width,0,'white',kuvat[Math.floor(Math.random()*kuvat.length)])
        oluet.push(newOlut)
    },1000)
}
function rahatLoppu() {
    setInterval(() => {
        if(raha <= 0) {
            console.log('rahat loppu')
            document.getElementById('konkurssi').style.display = 'inline'
        }
    },1000)
}
function meneToihin() {
    rahaEl.innerHTML = raha += 10
}
window.addEventListener('click', (event) => {
    oluet.forEach((olut,index) => {
        const dist = Math.hypot(olut.x - (event.clientX-canvas.width), olut.y - event.clientY)
        if (dist - 100 < 1) {
            rahaEl.innerHTML = raha -= 1
            oluet.splice(index,1)
        }
    })
})
animate()
spawnOlut()
rahatLoppu()