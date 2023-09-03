const minutesInput = document.querySelector(".minutes input");
const secondsInput = document.querySelector(".seconds input");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");
const ring = document.querySelector(".ring circle");

let timer;
let totalTime = 0;
let isPaused = false;

// Initial values for the timer
const initialMinutes = 15;
const initialSeconds = 0;

function updateTotalTime() {
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (!isNaN(minutes) && !isNaN(seconds)) {
    totalTime = minutes * 60 + seconds;
  }
}

function startTimer() {
  updateTotalTime();

  if (totalTime <= 0) {
    alert("Please enter a valid time.");
    return;
  }

  minutesInput.disabled = true;
  secondsInput.disabled = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = true;
  startButton.classList.add("disabled");

//   const totalDuration = initialMinutes * 60 + initialSeconds;

  timer = setInterval(function () {
    if (!isPaused) {
      totalTime--;

      const remainingMinutes = Math.floor(totalTime / 60);
      const remainingSeconds = totalTime % 60;

      minutesInput.value = String(remainingMinutes).padStart(2, "0");
      secondsInput.value = String(remainingSeconds).padStart(2, "0");

      if (totalTime <= 0) {
        clearInterval(timer);
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = false;
        startButton.classList.remove("disabled");
        ring.style.stroke = '#900A0A';
        // alert("Time is up!");
        const audio = document.getElementById("audio");
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play();
      }
    }

  }, 1000);


}

function togglePause() {
  isPaused = !isPaused;

  if (isPaused) {
    pauseButton.textContent = "Resume";
  } else {
    pauseButton.textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(timer);
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
  startButton.classList.remove("disabled");
  minutesInput.value = String(initialMinutes).padStart(2, "0");
  secondsInput.value = String(initialSeconds).padStart(2, "0");
  ring.style.stroke = '#09A65A'; // Set ring color to green
  isPaused = false;
  pauseButton.textContent = "Pause";

  
}

minutesInput.disabled = false;
secondsInput.disabled = false;

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetTimer);
