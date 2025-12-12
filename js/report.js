// =========================
// AMBIL DATA EMOTION HISTORY
// =========================
let history = JSON.parse(localStorage.getItem("emotionHistory")) || [];

// Hitung jumlah tiap emosi
let emotionCount = {
    senang: 0,
    sedih: 0,
    marah: 0,
    cemas: 0,
    bersyukur: 0
};

history.forEach(e => {
    const emo = e.emotion; // DIAMBIL DARI OBJECT

    if (emotionCount[emo] !== undefined) {
        emotionCount[emo]++;
    }
});

// Jika semua nilai 0, grafik tidak dibuat
const totalEmotion = Object.values(emotionCount).reduce((a, b) => a + b, 0);

if (totalEmotion === 0) {
    console.warn("Belum ada data emosi, grafik tidak akan ditampilkan.");
} else {
    // =========================
    // PIE CHART
    // =========================
    const ctx = document.getElementById("emotionChart").getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Senang", "Sedih", "Marah", "Cemas", "Bersyukur"],
            datasets: [{
                data: [
                    emotionCount.senang,
                    emotionCount.sedih,
                    emotionCount.marah,
                    emotionCount.cemas,
                    emotionCount.bersyukur
                ],
                backgroundColor: [
                    "#FACE1E",
                    "#250081",
                    "#B00303",
                    "#416134",
                    "#88BE71"
                ],
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",   // ⬅️ pindahkan legend ke bawah grafik
                    labels: {
                        color: "#fff",
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}


// =========================
// MENAMPILKAN JURNAL LENGKAP
// =========================
let journalHistory = JSON.parse(localStorage.getItem("journalHistory")) || [];
const journalContentDiv = document.getElementById("journalContent");

if (journalHistory.length === 0) {
    journalContentDiv.innerHTML = "<p>Belum ada jurnal tersimpan.</p>";
} else {
    journalHistory.reverse(); 
    journalHistory.forEach(item => {
        
        // Wrapper tiap jurnal
        const journalBox = document.createElement("div");
        journalBox.classList.add("journal-box");

        // Tanggal + waktu
        const datetimeEl = document.createElement("div");
        datetimeEl.classList.add("journal-datetime");
        datetimeEl.textContent = `${item.date} | ${item.time}`;

        // Emosi
        const emotionEl = document.createElement("div");
        emotionEl.classList.add("journal-emotion");
        emotionEl.textContent = `Perasaan : ${item.emotion}`;

        // Isi jurnal
        const textEl = document.createElement("p");
        textEl.classList.add("journal-text");
        textEl.textContent = item.text;

        // Masukkan ke box
        journalBox.appendChild(datetimeEl);
        journalBox.appendChild(emotionEl);
        journalBox.appendChild(textEl);

        // Garis pemisah
        const line = document.createElement("hr");

        // Tampilkan ke halaman
        journalContentDiv.appendChild(journalBox);
        journalContentDiv.appendChild(line);
    });
}
