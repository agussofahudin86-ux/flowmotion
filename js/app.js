// =====================
// HALAMAN BIODATA (index.html)
// =====================
if (document.getElementById("biodataForm")) {
    document.getElementById("biodataForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const age  = document.getElementById("age").value;
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        window.location.href = "emotion.html";  // BENAR

    });
}


// =====================
// HALAMAN EMOSI (emotion.html)
// =====================
const emotionBoxes = document.querySelectorAll(".emotion-box");

if (emotionBoxes.length > 0) {
    emotionBoxes.forEach(item => {
        item.addEventListener("click", function() {
            const emotion = this.dataset.emotion;
            localStorage.setItem("feelingToday", emotion);
            window.location.href = "game.html"; // ✔ CORRECT
        });
    });
}


// =====================
// HALAMAN GAME (game.html)
// =====================
if (document.getElementById("waterBtn")) {
    let count = 0;
    document.getElementById("waterBtn").addEventListener("click", () => {
        count++;
        if (count >= 5) {
            window.location.href = "journal.html"; // ✔ CORRECT
        }
    });
}
