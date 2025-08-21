// Player de música
const audioPlayer = document.getElementById('audio-player');
const tracks = document.querySelectorAll('.track');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let currentTrack = 0;

// Carregar e tocar música
function loadTrack(index) {
    if (index < 0) index = tracks.length - 1;
    if (index >= tracks.length) index = 0;

    currentTrack = index;
    const track = tracks[currentTrack];
    audioPlayer.src = track.getAttribute('data-src');
    audioPlayer.play();
    updatePlayButton();
}

// Clique na música da playlist
tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        loadTrack(index);
    });
});

// Controles
btnPlay.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayButton();
});

btnPrev.addEventListener('click', () => loadTrack(currentTrack - 1));
btnNext.addEventListener('click', () => loadTrack(currentTrack + 1));

// Atualizar botão play/pause
function updatePlayButton() {
    btnPlay.textContent = audioPlayer.paused ? '▶' : '⏸';
}

// Próxima música quando terminar
audioPlayer.addEventListener('ended', () => {
    loadTrack(currentTrack + 1);
});