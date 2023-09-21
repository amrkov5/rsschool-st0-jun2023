const audio = [
    {src: './assets/audio/beyonce.mp3',
    author: 'Beyonce',
    title: 'Don\'t Hurt Yourself'
    },
    {src: './assets/audio/dontstartnow.mp3',
    author: 'Dua Lipa',
    title: 'Don\'t Start Now'
    },
]
const playBtn = document.querySelector('.play-pause');
const track = document.querySelector('audio');
const next = document.querySelector('.control-btn:nth-child(2)');
const prev = document.querySelector('.control-btn');
let count = 0;

function playPause() {
    if (playBtn.classList.contains('paused')) {
        playBtn.classList.toggle('paused');
        playBtn.src = './assets/svg/pause.png'
        track.play()
    } else {
        playBtn.classList.toggle('paused');
        playBtn.src = './assets/svg/play.png'
        track.pause()
    }
}

function nextTrack() {
    count++
    if(count === audio.length) {
        count = 0;
    }
    track.src = audio[count].src;
}
function prevTrack() {
    count -= 1
    if(count < 0) {
        count = audio.length -1;
    }
    track.src = audio[count].src;
}

playBtn.addEventListener('click', playPause);
next.addEventListener('click', nextTrack);