let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let isRunning = false;
let lapCounter = 1;


const timeDisplay = document.getElementById('time-display');
const lapTimesList = document.getElementById('lap-times');


const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');


function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}


function pauseStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    updatedTime = 0;
    isRunning = false;
    lapCounter = 1;
    timeDisplay.innerHTML = '00:00:00';
    lapTimesList.innerHTML = '';
}


function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;

    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);

   
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    timeDisplay.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}


function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCounter}: ${timeDisplay.innerHTML}`;
        lapTimesList.appendChild(lapTime);
        lapCounter++;
    }
}


startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
