// =======================
// Inisialisasi Panduan Jurnal Berdasarkan Emosi
// =======================
const feelingText = document.querySelector('.feeling-text');
const journalTextarea = document.querySelector('.journal-frame textarea');

// Ambil emosi yang dipilih dari halaman emotion.html
const emotion = localStorage.getItem("feelingToday") || "senang";

// Tentukan panduan berdasarkan emosi
let guideText = "";
switch(emotion) {
    case "senang":
        guideText = "Hari ini aku merasa senang karena ...";
        break;
    case "sedih":
        guideText = "Hari ini aku merasa sedih karena ...";
        break;
    case "marah":
        guideText = "Hari ini aku merasa marah karena ...";
        break;
    case "cemas":
        guideText = "Hal yang membuatku cemas adalah ...";
        break;
    case "bersyukur":
        guideText = "Aku bersyukur karena ...";
        break;
    default:
        guideText = "Hari ini aku merasa ...";
}

// Tampilkan panduan di atas textarea dengan tetap menampilkan "Panduan:"
feelingText.textContent = `Panduan: ${guideText}`;

// =======================
// Tombol Navigasi
// =======================

// Tombol Back → kembali ke game.html
document.querySelector('.btn-back').onclick = () => {
    window.location.href = "game.html";
};

// Tombol Next → ke garden.html (aktif setelah simpan)
const btnNext = document.querySelector('.btn-next');
btnNext.onclick = () => {
    if (!btnNext.disabled) {
        window.location.href = "garden.html";
    }
};

// =======================
// Tombol Simpan Jurnal
// =======================
const btnSave = document.querySelector('.btn-save');

btnSave.onclick = () => {
    const journal = journalTextarea.value.trim();

    if (journal === "") {
        alert("Silakan isi jurnal sebelum menyimpan.");
        return;
    }

    // Format tanggal & waktu
    const now = new Date();
    const monthNames = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
    ];

    const formattedDate = 
        now.getDate().toString().padStart(2, "0") + " " +
        monthNames[now.getMonth()] + " " +
        now.getFullYear();

    const formattedTime =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0") + ":" +
        now.getSeconds().toString().padStart(2, "0");

    // Buat object jurnal
    const journalEntry = {
        text: journal,
        emotion: emotion,
        date: formattedDate,
        time: formattedTime
    };

    // Simpan ke localStorage
    localStorage.setItem("jurnalHariIni", JSON.stringify(journalEntry));

    let journals = JSON.parse(localStorage.getItem("journalHistory")) || [];
    journals.push(journalEntry);
    localStorage.setItem("journalHistory", JSON.stringify(journals));

    // Feedback simpan
    btnSave.textContent = "Menyimpan...";
    btnSave.disabled = true;

    setTimeout(() => {
        btnSave.textContent = "Tersimpan ✓";
        btnNext.disabled = false; // aktifkan tombol next
    }, 500);
};
