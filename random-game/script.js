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
pipeTop.src = './assets/sprites/pipe-green-top-long1.png';
pipeBot.src = './assets/sprites/pipe-green-bot-long1.png';
bird.src = './assets/sprites/yellowbird-upflap.png';
base.src = './assets/sprites/base.png';

let pipeY = 0;
let birdY = 235;
const birdX = canvas.width * 0.08
let pipesX = 250;
const speed = 1;
const birdFall = 2;
let baseArr = [];
const pipe = [{x: 250, y: randomYPipe()}]
let animationFrameId;

//get random for pipes Y position
function randomYPipe() {
    const min = -510
    const max = -(pipeTop.height - (canvas.height - 220));
    console.log(Math.floor(Math.random() * (max - min + 1)) + min)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//add new pipes
function addRemovePipes() {
    if (pipe[0].x == Math.floor(canvas.width * 0.3)) {
        pipe.push({x:canvas.width, y: randomYPipe()})
    // console.log(pipe)

    }
    if (pipe[0].x === 0 - pipeBot.width){
        pipe.shift()
    }
}

//jumping bird
let isUp = false;
let birdJump = 0;
function flap() {
    if (birdY >= birdJump) {
        birdY -= 7;
    } else {
        isUp = false;
    }
}

//moving floor
function addRemoveBase() {
    if (baseArr[baseArr.length - 1] + base.width === canvas.width ) {
        baseArr.push(canvas.width);
    }
    if (baseArr[0] + base.width === 0) {
        baseArr.shift();
    }
}

//collisions
function isTouchedCollision() {
    pipeTopCoordinate = pipe[0].y + pipeTop.height;
    if (birdY <= 0) {
        console.log(true)
        cancelAnimationFrame(animationFrameId);
    }
    if (birdY + bird.height > canvas.height - base.height) {
        cancelAnimationFrame(animationFrameId);
    }
    if (birdY >= pipeTopCoordinate && pipe[0].x < (birdX + birdX.width) && (pipe[0].x + pipeTop.width) >= birdX ) {
        cancelAnimationFrame(animationFrameId);
    }
}
//drawing the game
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
    ctx.drawImage(bird, birdX, birdY);
    addRemovePipes();
    addRemoveBase();
    animationFrameId = requestAnimationFrame(draw);
    isTouchedCollision()
}

base.onload = function () {
    baseArr = [0, base.width];
    draw();
}
document.addEventListener('click', () => {
    birdJump = birdY - Math.floor(canvas.height * 0.08);
    isUp = true;
});
document.addEventListener('keydown', () => {
    birdJump = birdY - Math.floor(canvas.height * 0.08);
    isUp = true;
});
document.addEventListener('DOMContentLoaded', setCanvasSize);