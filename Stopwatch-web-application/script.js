let startTime, updatedTime, difference;
let interval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

let lapCount = 0;

startBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        isRunning = true;

        startBtn.textContent = 'Running...';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        startBtn.disabled = true;
    }
});
pauseBtn.addEventListener('click', function() {
    clearInterval(interval);
    isRunning = false;

    startBtn.disabled = false;
    startBtn.textContent = 'Resume';
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
    lapBtn.disabled = true;
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    isRunning = false;
    difference = 0;
    lapCount = 0;
    timeDisplay.textContent = '00:00:00.00';
    lapsList.innerHTML = '';

    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', function() {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
    lapsList.appendChild(lapTime);
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}
