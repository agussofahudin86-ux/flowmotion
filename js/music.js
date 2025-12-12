// =========================
// GLOBAL BACKSOUND PLAYER
// =========================

const MUSIC_SRC = "assets/audio/backsound.mp3";
const LAST_POS_KEY = "musicPosition";
const MUSIC_VOLUME_KEY = "musicVolume";

let audio = new Audio(MUSIC_SRC);
audio.loop = true;

// Ambil posisi terakhir
let lastPos = localStorage.getItem(LAST_POS_KEY);
if (lastPos) {
    audio.currentTime = parseFloat(lastPos);
}

// Ambil volume terakhir
let lastVol = localStorage.getItem(MUSIC_VOLUME_KEY);
audio.volume = lastVol ? parseFloat(lastVol) : 0.5;

// Auto play saat halaman dibuka
window.addEventListener("load", () => {
    audio.play().catch(() => {
        console.log("Auto-play diblokir, start musik dengan user interaction.");
    });
});

// Simpan posisi musik setiap 500ms
setInterval(() => {
    localStorage.setItem(LAST_POS_KEY, audio.currentTime);
}, 500);

// OPTIONAL: function kontrol
window.setMusicVolume = function (v) {
    audio.volume = v;
    localStorage.setItem(MUSIC_VOLUME_KEY, v);
}

window.pauseMusic = function () {
    audio.pause();
}

window.playMusic = function () {
    audio.play();
}
