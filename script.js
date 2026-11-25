// --- 1. LOGIKA KALKULATOR WAKTU MEDIA SOSIAL ---
const hoursInput = document.getElementById('hoursInput');
const calculateBtn = document.getElementById('calculateBtn');
const resultBox = document.getElementById('resultBox');
const yearlyHoursEl = document.getElementById('yearlyHours');
const yearlyDaysEl = document.getElementById('yearlyDays');
const booksCountEl = document.getElementById('booksCount');

calculateBtn.addEventListener('click', () => {
    const dailyHours = parseFloat(hoursInput.value);

    if (isNaN(dailyHours) || dailyHours < 0 || dailyHours > 24) {
        alert('Masukkan jumlah jam yang valid antara 0 hingga 24 jam.');
        return;
    }

    const totalHoursPerYear = Math.round(dailyHours * 365);
    const totalDaysPerYear = (totalHoursPerYear / 24).toFixed(1);
    const potentialBooks = Math.floor(totalHoursPerYear / 6); // Rata-rata 6 jam per buku

    yearlyHoursEl.textContent = totalHoursPerYear.toLocaleString('id-ID');
    yearlyDaysEl.textContent = totalDaysPerYear;
    booksCountEl.textContent = potentialBooks.toLocaleString('id-ID');

    resultBox.classList.remove('hidden');
});

// --- 2. LOGIKA PENGATUR WAKTU FOKUS (POMODORO) ---
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const pauseTimerBtn = document.getElementById('pauseTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;
let timerInterval = null;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        defaultMinutes = parseInt(btn.dataset.time);
        timeLeft = defaultMinutes * 60;
        updateDisplay();
    });
});

startTimerBtn.addEventListener('click', () => {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Waktu sesi selesai! Kerja bagus, saatnya istirahat sejenak.');
        }
    }, 1000);
});

pauseTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = defaultMinutes * 60;
    updateDisplay();
});

// --- 3. LOGIKA TANTANGAN HARIAN TANPA GAWAI ---
const checkboxes = document.querySelectorAll('.challenge-check');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

function updateChallengeProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.challenge-check:checked').length;
    const percentage = (checked / total) * 100;

    progressText.textContent = `${checked}/${total} Selesai`;
    progressFill.style.width = `${percentage}%`;
}

checkboxes.forEach(box => {
    box.addEventListener('change', updateChallengeProgress);
});