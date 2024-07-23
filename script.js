let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let volume_btn = document.querySelector(".volume-control");
let random_repeat_btn = document.querySelector(".random-repeat");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let curr_track = document.createElement("audio");
wave.style.display = "none";
let track_index = 0;
let isPlaying = false;
let isRandom = true;
let isMuted = false;
let updateTimer;

const music_list = [
    {
        img: "img/astralstep.png",
        name: "Astral step",
        artist: "Shadowraze",
        music: "music/astral-step.mp3"
    },
    {
        img: "img/JUGGERNAUT.png",
        name: "JUGGERNAUT",
        artist: "Shadowraze",
        music: "music/shadowraze-juggernaut.mp3"
    },
    {
        img: "img/shadowfiend.jpg",
        name: "SHADOWFIEND",
        artist: "Shadowraze",
        music: "music/shadowraze-shadowfiend.mp3"
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    seek_slider.style.background = 'linear-gradient(to right, red 0%, gray 0%)';

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate("#");
    let Color2 = populate("#");
    var angle = "to right"; 

    let gradient = "linear-gradient(" + angle + "," + Color1 + "," + Color2 + ")";
    document.body.style.background = gradient;
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;

    seek_slider.style.background = 'linear-gradient(to right, red 0%, gray 0%)';
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    random_repeat_btn.classList.add("randomActive");
    document.getElementById("random-repeat-icon").classList.replace("fa-repeat", "fa-random");
}
function pauseRandom() {
    isRandom = false;
    random_repeat_btn.classList.remove("randomActive");
    document.getElementById("random-repeat-icon").classList.replace("fa-random", "fa-repeat");
    repeatTrack
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add("rotate");
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle"></i>';
    wave.style.display = "flex";
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove("rotate");
    playpause_btn.innerHTML = '<i class="fa fa-play-circle"></i>';
    wave.style.display = "none";
}

function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;

    // ���������� ���� ����� ������� ��� ����������� ��������
    let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.style.background = `linear-gradient(to right, red ${seekPosition}%, gray ${seekPosition}%)`;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        seek_slider.style.background = `linear-gradient(to right, red ${seekPosition}%, gray ${seekPosition}%)`;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function toggleMute() {
    isMuted = !isMuted;
    curr_track.muted = isMuted;
    document.getElementById("volume-icon").classList.toggle("fa-volume-mute", isMuted);
    document.getElementById("volume-icon").classList.toggle("fa-volume-up", !isMuted);
}

function toggleRandomRepeat() {
    isRandom = !isRandom;
    document.getElementById("random-repeat-icon").classList.toggle("fa-random", isRandom);
    document.getElementById("random-repeat-icon").classList.toggle("fa-repeat", !isRandom);
}
seek_slider.addEventListener("input", function () {
    let seekPosition = curr_track.duration * (seek_slider.value / 100);
    seek_slider.style.background = `linear-gradient(to right, red ${seek_slider.value}%, gray ${seek_slider.value}%)`;
});

seek_slider.addEventListener("change", seekTo);

document.addEventListener("DOMContentLoaded", function () {
    const balanceElement = document.getElementById("balance");
    const invokerImage = document.getElementById("invoker-image");

    let balance = 0;

    invokerImage.addEventListener("touchstart", function (event) {
        const touchPoints = event.touches.length;
        balance += touchPoints;
        balanceElement.textContent = balance;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const hpElement = document.getElementById("hp");
    const invokerImage = document.getElementById("invoker-image");
    const line = document.getElementById('red-line');
    const clickSound = document.getElementById('click-sound');
    const initialHp = 1000; 
    let hp = initialHp;
    clickSound.volume = 0.3;

    const images = [
        'img/hitmarker.png',
        'img/hitmarker2.png',
        'img/hitmarker3.png'
    ];
    let currentImageIndex = 0;

    invokerImage.addEventListener("touchstart", function (event) {
        const touchPoints = event.touches.length;
        hp -= touchPoints;
        hpElement.textContent = hp;

        updateLineWidth(hp);

        const touch = event.touches[0];
        createClickEffect(touch.clientX, touch.clientY);

        clickSound.currentTime = 0;
        clickSound.play();

        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    });

    function updateLineWidth(hp) {
        const newWidth = Math.max(0, hp / initialHp);
        line.style.transform = `scaleX(${newWidth})`;
    }

    function createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.backgroundImage = `url(${images[currentImageIndex]})`;
        effect.style.left = `${x - 10}px`; 
        effect.style.top = `${y - 10}px`;  
        document.body.appendChild(effect);

        requestAnimationFrame(() => {
            effect.classList.add('animate');
        });

        setTimeout(() => {
            effect.classList.remove('animate'); 
            setTimeout(() => {
                effect.remove(); 
            }, 1000); 
        }, 300); 

        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
});

