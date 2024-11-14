let timerInterval;
let timeRemaining;
const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    const [minutes, seconds] = timeInput.value.split(':').map(Number);
    timeRemaining = minutes * 60 + seconds;

    if (isNaN(timeRemaining) || timeRemaining <= 0) {
        alert("Please enter a valid time in MM:SS format.");
        return;
    }

    updateDisplay();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    timeInput.disabled = true;

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time’s up!");
        }
    }, 1000);
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
    timerDisplay.style.color = timeRemaining < 10 ? 'red' : '#333333';
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining = 0;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    timeInput.disabled = false;
    timeInput.value = '';
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);