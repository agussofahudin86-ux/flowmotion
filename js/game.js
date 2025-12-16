function goBack() {
  window.parent.goTo("emotion.html");
}

function goNext() {
  window.parent.goTo("journal.html");
}


// Ambil emosi dari halaman emotion
const emosiDipilih = localStorage.getItem("feelingToday") || "senang";

// ambil data skala bunga dari localStorage
let scaleData = JSON.parse(localStorage.getItem("flowerScaleData")) || {
  senang: 1,
  sedih: 1,
  cemas: 1,
  marah: 1,
  bersyukur: 1
};

// Peta gambar bunga
const bungaMap = {
  senang: "assets/img/bunga-senang.png",
  sedih: "assets/img/bunga-sedih.png",
  cemas: "assets/img/bunga-cemas.png",
  marah: "assets/img/bunga-marah.png",
  bersyukur: "assets/img/bunga-bersyukur.png"
};

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("flowerGrid");

  for (let i = 0; i < 15; i++) {
  const slot = document.createElement("div");

  // TAMBAHAN: tentukan baris
    const rowIndex = Math.floor(i / 5) + 1;
    slot.className = "flower-slot row-" + rowIndex;

    const jenis = Object.keys(bungaMap)[i % 5];
    const img = document.createElement("img");
    img.className = "flower";
    img.dataset.nama = jenis;
    img.src = bungaMap[jenis];

    img.style.transform = `scale(${scaleData[jenis]})`;

    const tanah = document.createElement("img");
    tanah.className = "tanah";
    tanah.src = "assets/img/tanah.png";

    slot.appendChild(img);
    slot.appendChild(tanah);

    grid.appendChild(slot);
  }

});

// =========================
// ANIMASI SIRAM & TUMBUH
// =========================
function mulaiMenyiram() {
  const teko = document.getElementById("teko");
  const targetList = document.querySelectorAll(`.flower[data-nama="${emosiDipilih}"]`);
  if (targetList.length === 0) return;

  // pilih salah satu target untuk menentukan posisi teko (paling tengah)
  const midIndex = Math.floor(targetList.length / 2);
  const target = targetList[midIndex];
  const tRect = target.getBoundingClientRect();

  // posisi awal teko
  teko.style.display = "block";
  teko.style.left = "80%";
  teko.style.top = "80%";
  teko.style.transform = "rotate(0deg)";

  setTimeout(() => {
    teko.style.transition = "all 1.5s ease";
    teko.style.left = tRect.left + 30 + "px";
    teko.style.top = tRect.top - 80 + "px";

    setTimeout(() => {
      teko.style.transition = "all 0.6s ease";
      teko.style.transform = "rotate(-45deg)";

      // siram semua bunga
      siramSemua(targetList, teko);

      setTimeout(() => {
        teko.style.transform = "rotate(0deg)";
        teko.style.left = "80%";
        teko.style.top = "80%";

        setTimeout(() => (teko.style.display = "none"), 600);

      }, 1000);

    }, 1500);

  }, 100);
}

// =====================================
// SIRAM SEMUA BUNGA EMOSI TERPILIH
// =====================================
function siramSemua(list, teko) {
  list.forEach((bunga, i) => {
    setTimeout(() => {
      efekAir(teko);
      efekTumbuh(bunga);
    }, i * 200);
  });

  // update scale pada data lokal
  scaleData[emosiDipilih] += 0.12;   // bunga tumbuh sedikit
  if (scaleData[emosiDipilih] > 2) scaleData[emosiDipilih] = 2; // batas maksimum

  localStorage.setItem("flowerScaleData", JSON.stringify(scaleData));
}


// =====================================
// ANIMASI AIR
// =====================================
function efekAir(teko) {
  const tRect = teko.getBoundingClientRect();
  const startX = tRect.left - 20;
  const startY = tRect.top + tRect.height * 0.70;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const drop = document.createElement("div");
      drop.className = "air";
      drop.textContent = "💧";

      const offsetX = Math.random() * 6 - 3;
      const offsetY = Math.random() * 6 - 3;

      drop.style.left = startX + offsetX + "px";
      drop.style.top = startY + offsetY + "px";

      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 1200);
    }, i * 120);
  }
}


// =====================================
// ANIMASI BUNGA TUMBUH (SMOOTH)
// =====================================
function efekTumbuh(bunga) {
  bunga.style.transition = "transform 0.4s ease";
  const jenis = bunga.dataset.nama;

  const newScale = scaleData[jenis];
  bunga.style.transform = `scale(${newScale})`;
}


// ===============================
// RESET TAMAN
// ===============================
function resetTaman() {
  scaleData = {
    senang: 1,
    sedih: 1,
    cemas: 1,
    marah: 1,
    bersyukur: 1
  };

  localStorage.setItem("flowerScaleData", JSON.stringify(scaleData));

  const flowers = document.querySelectorAll(".flower");
  flowers.forEach(f => {
    f.style.transform = "scale(1)";
  });
}
