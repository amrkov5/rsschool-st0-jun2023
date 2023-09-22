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
        bg: './assets/img/dontstartnow.png'
    },
];
const playBtn = document.querySelector('.play-pause');
const track = document.querySelector('audio');
const next = document.querySelector('.control-btn:nth-child(2)');
const prev = document.querySelector('.control-btn');
let count = 0;

function togglePlayBtn() {
    if (playBtn.classList.contains('paused')) {
        playBtn.classList.toggle('paused');
        playBtn.src = './assets/svg/pause.png';
        playPause();
    } else {
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

function preparePlay() {
    const bg = document.querySelector('.background');
    const artistText = document.querySelector('.artist');
    const titleText = document.querySelector('.title');
    const albumImg = document.querySelector('.track-cover');
    const curTime = document.querySelector('.start');
    const endTime = document.querySelector('.end');
    track.src = audio[count].src;
    bg.src = audio[count].bg;
    albumImg.src = audio[count].bg;
    artistText.textContent = audio[count].artist;
    titleText.textContent = audio[count].title;
    curTime.textContent = '00:00';
    track.addEventListener('loadedmetadata', () => {
        let min = Math.floor(track.duration / 60) 
        min < 10 ? min = '0' + min : min;
        let sec = parseInt(track.duration % 60);
        sec < 10 ? sec = '0' + sec : sec;
        endTime.textContent = `${min}:${sec}`;
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

document.addEventListener('DOMContentLoaded', preparePlay);
playBtn.addEventListener('click', togglePlayBtn);
next.addEventListener('click', nextTrack);
prev.addEventListener('click', prevTrack);
track.addEventListener('onended', nextTrack);