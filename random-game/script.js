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
const birdFall = 2;
let baseArr = [];
const pipe = [{x: 250, y: 0}]

function randomYPipe() {
    min = -250;
    max = 550;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRemovePipes() {
    if (pipe[0].x == Math.floor(canvas.width * 0.3)) {
        pipe.push({x:canvas.width, y: 0})
    }
    if (pipe[0].x === 0 - pipeBot.width){
        pipe.shift()
    }
}

let isUp = false;
let birdJump = 0;
function flap() {
    // console.log(birdY - Math.floor(canvas.height * 0.13), Math.floor(canvas.height * 0.13), birdY)
    if (birdY >= birdJump) {
        birdY -= 7;
    } else {
        isUp = false;
    }
    // if (i >= Math.floor(canvas.height * 0.13)) {
    // }
}

function addRemoveBase() {
    if (baseArr[baseArr.length - 1] + base.width === canvas.width ) {
        baseArr.push(canvas.width);
    }
    if (baseArr[0] + base.width === 0) {
        baseArr.shift();
    }
}

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBot, pipe[i].x, pipeTop.height + pipe[i].y + 130);
        pipe[i].x--;
    }
    for (let i = 0; i < baseArr.length; i++) {
        ctx.drawImage(base, baseArr[i], canvas.height - base.height);
        baseArr[i]--;
    }
    if (!isUp) {
        birdY += birdFall;
    } else {
        flap()
    }
    ctx.drawImage(bird, canvas.width * 0.08, birdY);
    addRemovePipes()
    addRemoveBase()
    requestAnimationFrame(draw);
}

base.onload = function () {
    baseArr = [0, base.width];
    draw();
}
document.addEventListener('click', () => {
    birdJump = birdY - Math.floor(canvas.height * 0.1);
    isUp = true;
});
// document.addEventListener('keydown', flap);
document.addEventListener('DOMContentLoaded', setCanvasSize);