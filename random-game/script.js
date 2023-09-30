//adding elements
const canvas = document.createElement('canvas');
canvas.width = setCanvasWidth();
canvas.height = setCanvasHeight();
document.querySelector('.main').appendChild(canvas);
const ctx = canvas.getContext('2d');
const bg = new Image();
const pipeTop = new Image();
const pipeBot = new Image();
const bird = new Image();
const base = new Image();
const wing = new Audio();
const hit = new Audio();
const startBtn = new Image();
const leaderBrdBtn = new Image();

function setCanvasWidth() {
    const width = window.innerWidth * 0.3;
    if (width > 550) {
        return 550;
    }
    return width;
}

function setCanvasHeight() {
    const height = window.innerHeight * 0.8;
    if (height > 768) {
        return 768;
    } 
    return height;
}

//load assets
bg.src = './assets/sprites/background-day.png';
pipeTop.src = './assets/sprites/pipe-green-top-long1.png';
pipeBot.src = './assets/sprites/pipe-green-bot-long1.png';
bird.src = './assets/sprites/yellowbird-upflap.png';
base.src = './assets/sprites/base.png';
wing.src = './assets/audio/wing.ogg';
hit.src = './assets/audio/hit.ogg';
startBtn.src = './assets/sprites/multimedia.png';
leaderBrdBtn.src = './assets/sprites/podium.png'

//set variables
const birdX = canvas.width * 0.08
const speed = 1;
const defaultSpeed = 2;
const gravity = 0.1;
const pipe = [{x:canvas.width,y: randomYPipe()}]
const gap = Math.floor(canvas.height * 0.25);
let birdFallSpeed = 2;
let baseArr = [];
let pipesX = 0;
let animationFrameId;
let pipeY = 0;
let birdY = 235;
let isPlaying = false;
let isInMenu = true;
let isInLeaderboard = false;
let btnsX = Math.floor(canvas.width / 2)- 50;
let startBtnY = canvas.height * 0.15 ;
let leaderBrdBtnY = canvas.height -  (canvas.height * 0.15) - 100;


//get random for pipes Y position
function randomYPipe() {
    const min = 40 - pipeTop.height;
    const max = (pipeTop.height - (canvas.height - 220)) * -1;
    let r = Math.random()
    let a = Math.floor(r * (max - min + 1)) + min
    return a;
}

//add new pipes
function addRemovePipes() {
    if (pipe[0].x == Math.floor(canvas.width * 0.3)) {
        pipe.push({x:canvas.width, y: randomYPipe()})
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

//gravity
function birdFall() {
    birdFallSpeed += gravity;
    return birdFallSpeed;
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
function isTouchCollision() {
    pipeTopCoordinate = pipe[0].y + pipeTop.height;
    if (birdY <= 0) {
        hit.play();
        cancelAnimationFrame(animationFrameId);
    }
    if (birdY + bird.height > canvas.height - base.height) {
        hit.play();
        cancelAnimationFrame(animationFrameId)
        isPlaying = false;
    }
    if (birdY <= pipeTopCoordinate && pipe[0].x < (birdX + bird.width - 2) && (pipe[0].x + pipeTop.width) >= birdX) {
        hit.play();
        cancelAnimationFrame(animationFrameId);
        isPlaying = false;
    }
    if (birdY + bird.height >= pipeTopCoordinate + gap && pipe[0].x < (birdX + bird.width - 2) && (pipe[0].x + pipeTop.width) >= birdX) {
        hit.play();
        cancelAnimationFrame(animationFrameId);
        isPlaying = false;
    }
}

//eventHandler
function eventHandler() {
    if (isPlaying) {
        birdFallSpeed = defaultSpeed;
        birdJump = birdY - Math.floor(canvas.height * 0.08);
        wing.currentTime = 0;
        wing.play();
        isUp = true;
    }
}

//Start game and open leaderboard
function clickBtns() {
    const canvasY = canvas.getBoundingClientRect().top;
    const canvasX = canvas.getBoundingClientRect().left;
    pointerY = event.clientY;
    pointerX = event.clientX;
    if (!isPlaying) {
        if (pointerX >= canvasX + btnsX && pointerX <= canvasX + btnsX + 100
            && pointerY >= canvasY + startBtnY && pointerY <= canvasY + startBtnY + 100) {
            isPlaying = true;
            isInMenu = false;
        }
        if (pointerX >= canvasX + btnsX && pointerX <= canvasX + btnsX + 100
            && pointerY >= canvasY + leaderBrdBtnY && pointerY <= canvasY + leaderBrdBtnY + 100) {
            isInMenu = false;
            isInLeaderboard = true;
        }
    }
}

//drawing the game
function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    // console.log(birdY)
    if (isPlaying) {
        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBot, pipe[i].x, pipeTop.height + pipe[i].y + gap);
            pipe[i].x--;
        }
        if (!isUp) {
            birdY += birdFall();
        } else {
            flap()
        }
        addRemovePipes();
    }
    for (let i = 0; i < baseArr.length; i++) {
        ctx.drawImage(base, baseArr[i], canvas.height - base.height);
        baseArr[i]--;
    }
    addRemoveBase();
    ctx.drawImage(bird, birdX, birdY);
    if (isInMenu) {
        ctx.drawImage(startBtn, btnsX, startBtnY, 100, 100);
        ctx.drawImage(leaderBrdBtn, btnsX, leaderBrdBtnY, 100, 100);
    }
    if (isInLeaderboard) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'gray'
        ctx.fillRect(canvas.height * 0.1, canvas.width * 0.1, canvas.width - canvas.width * 0.2,canvas.height - canvas.heigth * 0.1)
        ctx.globalAlpha = 1;

    }
    animationFrameId = requestAnimationFrame(draw);
    isTouchCollision()
}

base.onload = function () {
    baseArr = [0, base.width];
    draw();
}
canvas.addEventListener('mousedown', clickBtns);
document.addEventListener('click', eventHandler);
document.addEventListener('keydown', eventHandler);
window.addEventListener('blur', cancelAnimationFrame(animationFrameId));