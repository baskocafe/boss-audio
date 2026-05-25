// Элементы
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const voiceMessage = document.querySelector('.voice-message');

const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

const audio = new Audio('./assets/boss.ogg');

let isPlaying = false;

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        timeDisplay.textContent = formatTime(audio.currentTime);
    }
}

function setProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = (x / width) * 100;
    const time = (percent / 100) * audio.duration;
    audio.currentTime = time;
    updateProgress();
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        voiceMessage.classList.add('playing');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        voiceMessage.classList.remove('playing');
    }
}

function onAudioEnd() {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    voiceMessage.classList.remove('playing');
    progressFill.style.width = '0%';
    timeDisplay.textContent = formatTime(audio.duration);
}

function onLoadedMetadata() {
    timeDisplay.textContent = formatTime(audio.duration);
}

playPauseBtn.addEventListener('click', togglePlay);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', onAudioEnd);
audio.addEventListener('loadedmetadata', onLoadedMetadata);
audio.addEventListener('canplay', () => {
    if (!audio.duration) return;
    timeDisplay.textContent = formatTime(audio.duration);
});


audio.load();