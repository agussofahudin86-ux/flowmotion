// ============================
// GARDEN.JS - FINAL TANPA GRID & MENGIKUTI REPORT
// ============================

const assessmentImg = document.getElementById("assessmentImg");
const assessmentText = document.getElementById("assessmentText");

// Saat halaman terbuka, langsung load dari localStorage
document.addEventListener("DOMContentLoaded", () => {
    loadAssessmentFromLocal();
});

// =======================
// BACA DATA SESUAI REPORT
// =======================
function loadAssessmentFromLocal() {

    let history = JSON.parse(localStorage.getItem("emotionHistory")) || [];

    if (history.length === 0) {
        assessmentImg.src = "assets/img/keadaan-default.jpg";
        assessmentText.innerText = "Belum ada data emosi untuk dianalisis.";
        return;
    }

    // Hitung jumlah tiap emosi
    const counts = { senang: 0, sedih: 0, cemas: 0, marah: 0, bersyukur: 0 };

    history.forEach(e => {
        if (counts[e.emotion] !== undefined) {
            counts[e.emotion]++;
        }
    });

    // Cari emosi terbanyak
    const maxEmotion = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

    const emotionImages = {
        senang: "keadaan-senang.jpg",
        sedih: "keadaan-sedih.jpg",
        cemas: "keadaan-cemas.jpg",
        marah: "keadaan-marah.jpg",
        bersyukur: "keadaan-bersyukur.jpg"
    };
    
    assessmentImg.src = `assets/img/${emotionImages[maxEmotion]}`;
   
}

// =======================
// NAVIGASI HALAMAN
// =======================
function goReport() { window.location.href = "report.html"; }
function goEmotion() { window.location.href = "emotion.html"; }
function goHome() { window.location.href = "index.html"; }
