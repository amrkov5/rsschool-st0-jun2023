const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bg = new Image();
const pipeTop = new Image();
const pipeBot = new Image();
const bird = new Image();
const base = new Image();

function setCanvasSize() {
    const width = window.innerWidth * 0.3;
    const height = window.innerHeight * 0.8;
    if (width > 550 || height > 768) {
        canvas.width = 550;
        canvas.height = 768;
    } else {
        canvas.width = width;
        canvas.height = height;
    }
}



bg.src = './assets/sprites/background-day.png';
pipeTop.src = './assets/sprites/pipe-green-top.png';
pipeBot.src = './assets/sprites/pipe-green-bot.png';
bird.src = './assets/sprites/yellowbird-upflap.png';
base.src = './assets/sprites/base.png';

let pipeY = 0;
let birdY = 235;
let pipesX = 250;
const speed = 1;
const birdFall = 3;
const pipe = [{x: 250, y: 0}]
const baseArr = [0, base.width - 22];

function randomYPipe() {
    min = -250;
    max = 550;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBot, pipe[i].x, pipeTop.height + pipe[i].y + 130);
        pipe[i].x--;
    }
    for (let i = 0; i < 2; i++){
        ctx.drawImage(base, baseArr[i], canvas.height - base.height);
        baseArr[i]--;
    }
    ctx.drawImage(bird, 15, birdY);
    birdY += birdFall;
    if (pipe[0].x == Math.floor(canvas.width * 0.3)) {
        pipe.push({x:canvas.width, y: 0})
        // console.log(pipe[0])
    }
    if (pipe[0].x === 0 - pipeBot.width){
        pipe.shift()
    }
    console.log(baseArr)
    if (baseArr[0] + base.width - 20 === 0 ) {
        baseArr[0] = baseArr[1] + base.width - 22;
    }
    if (baseArr[1] + base.width - 22 === 0 ) {
        baseArr[1] = baseArr[0] + base.width - 22;
    }
    requestAnimationFrame(draw);
}

base.onload = draw;
document.addEventListener('DOMContentLoaded', setCanvasSize);