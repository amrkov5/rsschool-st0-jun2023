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
const returnBtn = new Image();
const gameOverImg = new Image();
const countDigit = new Image();

//load assets
bg.src = './assets/sprites/background-day.png';
pipeTop.src = './assets/sprites/pipe-green-top-long1.png';
pipeBot.src = './assets/sprites/pipe-green-bot-long1.png';
bird.src = './assets/sprites/yellowbird-upflap.png';
base.src = './assets/sprites/base.png';
wing.src = './assets/audio/wing.ogg';
hit.src = './assets/audio/hit.ogg';
startBtn.src = './assets/sprites/multimedia.png';
leaderBrdBtn.src = './assets/sprites/podium.png';
returnBtn.src = './assets/sprites/turn-back.png';
gameOverImg.src = './assets/sprites/gameover.png';
countDigit.src = './assets/sprites/1.png';

//set variables
const birdX = canvas.width * 0.08;
const speed = 2;
const defaultSpeed = 2;
const gravity = 0.1;
const pipe = [{x:canvas.width,y: (pipeTop.height - (canvas.height - 80) / 2) * -1}];
const gap = Math.floor(canvas.height * 0.25);
const leaderboardW = canvas.width - canvas.width * 0.2;
const leaderboardH = canvas.height - canvas.height * 0.2;
// const leaderboardArr = [];
const btnsX = Math.floor(canvas.width / 2) - 50;
const startBtnY = canvas.height * 0.15 ;
const leaderBrdBtnY = canvas.height - (canvas.height * 0.15) - 100;
const returnBtnY = canvas.width * 0.1 + leaderboardH - 50;
let birdFallSpeed = 2;
let baseArr = [];
let pipesX = 0;
let animationFrameId;
let pipeY = 0;
let birdY = canvas.height / 2;
let isPlaying = false;
let isInMenu = true;
let isInLeaderboard = false;
let scoreGap = leaderboardH * 0.035;
let scoreOffset = scoreGap;
let gameOver = false;
let gameCount = 0;
let isShowing = false;
let curTime = 0;
let count = [0];

//set canvas size
function setCanvasWidth() {
    const width = window.innerWidth * 0.3;
    if (width > 400) {
        return 400;
    }
    if (width < 300) {
        return 300;
    }
    return width;
}

function setCanvasHeight() {
    const height = window.innerHeight * 0.8;
    if (height > 650) {
        return 650;
    } 
    if (height < 340) {
        return 340;
    }
    return height;
}

//get random for pipes Y position
function randomYPipe() {
    const min = 40 - pipeTop.height;
    const max = (pipeTop.height - (canvas.height - 220)) * -1;
    let r = Math.random();
    let a = Math.floor(r * (max - min + 1)) + min;
    return a;
}

//add new pipes
function addRemovePipes() {
    if (pipe[0].x >= Math.floor(canvas.width * 0.3) - 1.9 && pipe[0].x <= Math.floor(canvas.width * 0.3)) {
        pipe.push({x:canvas.width, y: randomYPipe()});
    }
    if (pipe[0].x + pipeBot.width >= -1.9 && pipe[0].x + pipeBot.width <= 0 ){
        pipe.shift();
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
function hasTouchedCollision() {
    pipeTopCoordinate = pipe[0].y + pipeTop.height;
    if (isPlaying) {
        if (birdY <= 0) {
            hit.play();
            saveGetResults('set');
            gameOver = true;
            isPlaying = false;
        }
        if (birdY + bird.height > canvas.height - base.height) {
            hit.play();
            saveGetResults('set');
            gameOver = true;
            isPlaying = false;
        }
        if (birdY <= pipeTopCoordinate && pipe[0].x < (birdX + bird.width - 2) && (pipe[0].x + pipeTop.width) >= birdX) {
            hit.play();
            saveGetResults('set');
            gameOver = true;
            isPlaying = false;
        }
        if (birdY + bird.height >= pipeTopCoordinate + gap && pipe[0].x < (birdX + bird.width - 2) && (pipe[0].x + pipeTop.width) >= birdX) {
            hit.play();
            saveGetResults('set');
            gameOver = true;
            isPlaying = false;
        }
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
    if (gameOver) {
        location.reload()
    }
    if (isInMenu && event.key === " ") {
        isInMenu = false;
        isPlaying = true;
    }
}

//Start game and open leaderboard
function clickBtns() {
    const canvasY = canvas.getBoundingClientRect().top;
    const canvasX = canvas.getBoundingClientRect().left;
    pointerY = event.clientY;
    pointerX = event.clientX;
    if (!isPlaying && isInMenu || !isPlaying && isInLeaderboard) {
        if (pointerX >= canvasX + btnsX && pointerX <= canvasX + btnsX + 100
            && pointerY >= canvasY + startBtnY && pointerY <= canvasY + startBtnY + 100) {
            isPlaying = true;
            isInMenu = false;
        }
        if (pointerX >= canvasX + btnsX && pointerX <= canvasX + btnsX + 100
            && pointerY >= canvasY + leaderBrdBtnY && pointerY <= canvasY + leaderBrdBtnY + 100 && !isInLeaderboard) {
            isInMenu = false;
            isInLeaderboard = true;
        } else if (pointerX >= canvasX + btnsX + 25 && pointerX <= canvasX + btnsX + 75
                && pointerY >= canvasY + returnBtnY && pointerY <= canvasY + returnBtnY + 50 && isInLeaderboard) {
                isInMenu = true;
                isInLeaderboard = false;
        }
    }
}

//drawing leaderboard menu
function drawLeaderboard() {
    const leaderboardArr = saveGetResults('get');
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#000";
    ctx.fillRect(canvas.width * 0.1, canvas.width * 0.1, leaderboardW, leaderboardH - 70);
    ctx.globalAlpha = 1;
    for (let i = 0; i < leaderboardArr.length; i++) {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "#000";
        ctx.fillRect(canvas.width * 0.1 + scoreGap, canvas.width * 0.1 + scoreOffset, leaderboardW - scoreGap * 2, (leaderboardH - scoreGap * 11 - 70) / 10);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff'
        ctx.font = `${((leaderboardH - scoreGap * 11 - 70) / 10) - 1}px Arial`
        const text = 'Score: ' + leaderboardArr[i];
        const textX = (canvas.width * 0.1 + scoreGap) + 5;
        const textY = canvas.width * 0.1 + scoreOffset + 2 + scoreGap;
        if (leaderboardArr[i]) {
            ctx.fillText(text, textX, textY);
        }
        scoreOffset += scoreGap + (leaderboardH - scoreGap * 11 - 70) / 10;
    }
    scoreOffset = scoreGap;
    ctx.drawImage(returnBtn, btnsX + 25, returnBtnY, 50, 50);
}

//countScore
function countScore(timestamp) {
    if (pipe[0].x + pipeTop.width === Math.floor(birdX)) {
        gameCount += 1;
        isShowing = true;
        curTime = timestamp;
        count = gameCount.toString().split('').map(Number);
    }
}

//draw game count
function drawCount() {
    let countOffset = 0;
    if (count.length > 2) {
        countOffset = canvas.width / 2 - 26;
    } else {
        countOffset = canvas.width / 2 - 12;
    }
    for (let i = 0; i < count.length; i++) {
        countDigit.src = `./assets/sprites/${count[i]}.png`;
        if (!gameOver) {
            if (i === 0) {
                ctx.drawImage(countDigit, countOffset, canvas.height * 0.25);
            } else {
                ctx.drawImage(countDigit, countOffset + 24 * i, canvas.height * 0.25);
            }
        } else {
            if (i === 0) {
                ctx.drawImage(countDigit, countOffset, canvas.height * 0.45 + gameOverImg.height);
            } else {
                ctx.drawImage(countDigit, countOffset + 24 * i, canvas.height * 0.45 + gameOverImg.height);
            }
        }
    }
}

//save results
function saveGetResults(task) {
    const savedResult = JSON.parse(localStorage.getItem('leaderboard'));
    if (task === 'get') {
        if (!savedResult) {
            return [];
        }
        return JSON.parse(localStorage.getItem('leaderboard'));
    }
    if (task === 'set') {
        if (!savedResult && gameCount > 0) {
            localStorage.setItem('leaderboard', JSON.stringify([gameCount]));
        } else {
            if (savedResult.length < 10 && gameCount > 0) {
                savedResult.push(gameCount);
                savedResult.sort((a,b) => b-a);
                localStorage.setItem('leaderboard', JSON.stringify(savedResult));
            } else {
                if (savedResult[9] < gameCount && gameCount > 0) {
                    savedResult.pop();
                    savedResult.push(gameCount);
                    savedResult.sort((a,b) => b-a);
                    localStorage.setItem('leaderboard', JSON.stringify(savedResult));
                }
            }
        }
    }
}

//drawing the game
function draw(timestamp) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBot, pipe[i].x, pipeTop.height + pipe[i].y + gap);
        if (isPlaying) {
            pipe[i].x -= speed;
        }
    }
    if (isPlaying) {
        if (!isUp) {
            birdY += birdFall();
        } else {
            flap()
        }
    }
    addRemovePipes();
    for (let i = 0; i < baseArr.length; i++) {
        ctx.drawImage(base, baseArr[i], canvas.height - base.height);
        if (!gameOver) {
            baseArr[i] -= speed;
        }
    }
    addRemoveBase();
    ctx.drawImage(bird, birdX, birdY);
    if (isInMenu) {
        ctx.drawImage(startBtn, btnsX, startBtnY, 100, 100);
        ctx.drawImage(leaderBrdBtn, btnsX, leaderBrdBtnY, 100, 100);
    }
    if (isInLeaderboard) {
        drawLeaderboard();
    }
    if (gameOver) {
        ctx.drawImage(gameOverImg, btnsX + 50 - gameOverImg.width / 2, canvas.height * 0.35);
        drawCount()
    }
    countScore(timestamp);
    if (isShowing && timestamp < curTime + 1500) {
        drawCount()
    }
    animationFrameId = requestAnimationFrame(draw);
    hasTouchedCollision()
}

base.onload = function () {
    baseArr = [0, base.width];
    draw();
}
canvas.addEventListener('mousedown', clickBtns);
document.addEventListener('click', eventHandler);
document.addEventListener('keydown', () =>{
    if (event.key === " ") {
        eventHandler()
    }
});
// window.addEventListener('blur', cancelAnimationFrame(animationFrameId));