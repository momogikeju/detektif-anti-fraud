const scenarios = [
    { text: "Seorang surveyor menerima uang dari customer yang sedang melakukan survey dan klaim kendaraannya.", isFraud: true },
    { text: "Karyawan melaporkan pengeluaran sesuai bukti.", isFraud: false },
    { text: "Manajer menawarkan uang untuk meloloskan klaim palsu.", isFraud: true },
    { text: "Staf menggunakan kendaraan dinas untuk perjalanan resmi.", isFraud: false },
    { text: "Seseorang melakukan klaim asuransi dengan tidak menggunakan polis miliknya.", isFraud: true }
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
