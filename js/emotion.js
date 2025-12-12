// ================
// EMOTION PAGE LOGIC
// ================

// Ambil semua kotak emosi
const emotionBoxes = document.querySelectorAll(".emotion-box");

if (emotionBoxes.length > 0) {
    emotionBoxes.forEach(box => {
        box.addEventListener("click", function () {

            const selectedEmotion = this.dataset.emotion;

            // Simpan emosi hari ini
            localStorage.setItem("feelingToday", selectedEmotion);

            // Simpan ke riwayat emosi
            let history = JSON.parse(localStorage.getItem("emotionHistory")) || [];
            history.push({
                emotion: selectedEmotion,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem("emotionHistory", JSON.stringify(history));

            // Lanjut ke game
            window.location.href = "game.html";
        });
    });
}
