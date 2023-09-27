const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bg = new Image();
const pipeTop = new Image();
const pipeBot = new Image();
const bird = new Image();
const base = new Image();

bg.src = './assets/sprites/background-day.png';
pipeTop.src = './assets/sprites/pipe-green-top.png';
pipeBot.src = './assets/sprites/pipe-green-bot.png';
bird.src = './assets/sprites/yellowbird-upflap.png';
base.src = './assets/sprites/base.png';

console.log(base.height)

let pipeY = -150;
let birdY = 235;
let pipesX = 250;
const pipesMove = 2;
const birdFall = 2;

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(pipeTop, pipesX, pipeY);
    ctx.drawImage(pipeBot, pipesX, pipeTop.height + pipeY + 130);
    ctx.drawImage(base, 0, canvas.height - (base.height - 30), canvas.width, base.height);
    ctx.drawImage(bird, 15, birdY);
    birdY += birdFall;
    pipesX -= pipesMove;

    requestAnimationFrame(draw)
}

base.onload = draw;