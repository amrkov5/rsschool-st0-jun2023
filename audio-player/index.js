const audio = [
    {   
        src: './assets/audio/beyonce.mp3',
        artist: 'Beyonce',
        title: 'Don\'t Hurt Yourself',
        bg: './assets/img/lemonade.png'
    },
    {
        src: './assets/audio/dontstartnow.mp3',
        artist: 'Dua Lipa',
        title: 'Don\'t Start Now',
        bg: './assets/img/dontstartnow.png',
    },
];
const playBtn = document.querySelector('.play-pause');
const track = document.querySelector('audio');
const next = document.querySelector('.control-btn:nth-child(2)');
const prev = document.querySelector('.control-btn');
const curTime = document.querySelector('.start');
const endTime = document.querySelector('.end');
const slider = document.getElementById('slider');
let count = 0;

function togglePlayBtn() {
    const cover = document.querySelector('.track-logo');
    if (playBtn.classList.contains('paused')) {
        playBtn.classList.toggle('paused');
        playBtn.src = './assets/svg/pause.png';
        cover.classList.toggle('cover-play');
        playPause();
    } else {
        cover.classList.toggle('cover-play');
        playBtn.classList.toggle('paused');
        playBtn.src = './assets/svg/play.png';
        playPause();
    }
}

function playPause() {
    if (!track.paused) {
        track.pause();
    } else {
        track.play();
    }
}

function getTrackTime(num) {
    let min = Math.floor(num / 60) 
    min < 10 ? min = '0' + min : min;
    let sec = parseInt(num % 60);
    sec < 10 ? sec = '0' + sec : sec;
    return `${min}:${sec}`
}

function preparePlay() {
    const bg = document.querySelector('.background');
    const artistText = document.querySelector('.artist');
    const titleText = document.querySelector('.title');
    const albumImg = document.querySelector('.track-cover');
    track.src = audio[count].src;
    bg.src = audio[count].bg;
    albumImg.src = audio[count].bg;
    artistText.textContent = audio[count].artist;
    titleText.textContent = audio[count].title;
    curTime.textContent = '00:00';
    track.addEventListener('loadedmetadata', () => {
        endTime.textContent = getTrackTime(track.duration);
    })
}

function nextTrack() {
    count++
    if(count === audio.length) {
        count = 0;
    }
    track.src = audio[count].src;
    preparePlay();
    if (playBtn.classList.contains('paused')) {
        togglePlayBtn();
    } else {
        playPause();
    }
}
function prevTrack() {
    count -= 1
    if(count < 0) {
        count = audio.length -1;
    }
    track.src = audio[count].src;
    preparePlay();
    if (playBtn.classList.contains('paused')) {
        togglePlayBtn();
    } else {
        playPause();
    }
}

function sliderMove() {
    slider.max = track.duration;
    slider.value = Math.floor(slider.max * track.currentTime / track.duration);
    curTime.textContent = getTrackTime(track.currentTime)
}

function pickTime() {
    clearInterval(interval);
    slider.addEventListener('input', () => {
        curTime.textContent = getTrackTime(slider.value)
    })
}
let interval = setInterval(sliderMove, 500);

document.addEventListener('DOMContentLoaded', preparePlay);
playBtn.addEventListener('click', togglePlayBtn);
next.addEventListener('click', nextTrack);
prev.addEventListener('click', prevTrack);
track.addEventListener('ended', nextTrack);
slider.addEventListener('mousedown', pickTime);
slider.addEventListener('change', () => {
    interval = setInterval(sliderMove, 500);
    track.currentTime = slider.value;
})