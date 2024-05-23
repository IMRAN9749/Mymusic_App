console.log("Welcome to My Music");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressBar = document.getElementById('myprogressBar');
let gifsongs = document.getElementById('gifsongs');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Let me love you", filePath: "1.mp3", coverpath: "1pic.jpeg" },
    { songName: "Friends", filePath: "2.mp3", coverpath: "2pic.jpeg" },
    { songName: "Despacito", filePath: "3.mp3", coverpath: "3pic.jpg" },
    { songName: "Taki Taki", filePath: "4.mp3", coverpath: "4pic.jpeg" },
    { songName: "Lily", filePath: "5.mp3", coverpath: "5pic.jpeg" },
    { songName: "Ya Lili", filePath: "6.mp3", coverpath: "6pic.jpeg" },
    { songName: "Darkside", filePath: "7.mp3", coverpath: "7pic.jpeg" },
    { songName: "Sugar", filePath: "8.mp3", coverpath: "8pic.jpeg" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gifsongs.style.opacity = 1;
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
};

const pauseSong = () => {
    audioElement.pause();
    gifsongs.style.opacity = 0;
    masterplay.classList.remove("fa-circle-pause");
    masterplay.classList.add("fa-circle-play");
};

masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        pauseSong();
        makeAllPlays();
    }
});

audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressBar.value = progress;
});

myprogressBar.addEventListener('change', () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
});

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        playSong(songIndex);
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    makeAllPlays();
    playSong(songIndex);
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    playSong(songIndex);
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});
