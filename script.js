const scenarios = [
    { text: "Pak Budi bekerja di bagian klaim asuransi. Dia memanipulasi data klaim palsu atas nama nasabah yang sebenarnya tidak pernah mengajukan klaim. Uang klaim tersebut masuk ke rekening pribadinya.", isFraud: true },
    { text: "Bu Sinta, seorang petugas survei asuransi, menerima hadiah berupa voucher belanja dari nasabah sebagai ucapan terima kasih atas pelayanan yang baik. Hadiah tersebut dilaporkan ke bagian kepatuhan perusahaan sesuai kebijakan.", isFraud: false },
    { text: "Seorang calon nasabah menawarkan sejumlah uang kepada staf asuransi untuk mempercepat proses persetujuan polis, meskipun dokumennya belum lengkap. Staf tersebut menolak dan melaporkan kejadian ini kepada atasannya.", isFraud: false },
    { text: "Pak Toni ingin klaim asuransinya disetujui meskipun kerusakan kendaraan yang diajukan terjadi sebelum polis aktif. Dia memberikan uang kepada petugas klaim agar laporan tersebut dimanipulasi.", isFraud: true },
    { text: "Pak Andi, seorang pejabat di perusahaan asuransi, menerima hadiah berupa tiket liburan dari mitra bisnis perusahaan setelah menyetujui kontrak kerja sama. Hadiah tersebut tidak dilaporkan dan dicurigai sebagai bentuk imbalan tersembunyi.", isFraud: true }
];

let currentScenarioIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

// Elemen HTML
const scenarioText = document.getElementById('scenario-text');
const fraudBtn = document.getElementById('fraud-btn');
const noFraudBtn = document.getElementById('no-fraud-btn');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
const scoreBoard = document.getElementById('score');
const infographicContainer = document.getElementById('infographic-container');
const timerText = document.getElementById('time-left');

// Suara
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const gameOverSound = document.getElementById('game-over-sound');

// Timer
function startTimer() {
    timeLeft = 7;
    timerText.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            result.textContent = "Waktu habis! Anda tidak menjawab.";
            score -= 5;
            scoreBoard.textContent = score;
            nextBtn.style.display = "block";
        }
    }, 1000);
}

// Menampilkan skenario
function displayScenario(index) {
    scenarioText.textContent = scenarios[index].text;
    result.textContent = "";
    nextBtn.style.display = "none";
    startTimer();
}

// Memproses jawaban
function processAnswer(isFraud) {
    clearInterval(timerInterval);

    const currentScenario = scenarios[currentScenarioIndex];

    if (isFraud === currentScenario.isFraud) {
        result.textContent = "Benar! Ini adalah " + (isFraud ? "Fraud." : "Tidak Fraud.");
        score += 10;
        correctSound.play();
    } else {
        result.textContent = "Salah! Ini adalah " + (currentScenario.isFraud ? "Fraud." : "Tidak Fraud.");
        score -= 5;
        wrongSound.play();
    }

    scoreBoard.textContent = score;
    nextBtn.style.display = "block";
}

// Tombol
fraudBtn.addEventListener('click', () => processAnswer(true));
noFraudBtn.addEventListener('click', () => processAnswer(false));

nextBtn.addEventListener('click', () => {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        displayScenario(currentScenarioIndex);
    } else {
        scenarioText.textContent = "Game selesai! Skor akhir Anda: " + score;
        infographicContainer.style.display = "block";
        gameOverSound.play();
    }
});

// Mulai game
displayScenario(currentScenarioIndex);
