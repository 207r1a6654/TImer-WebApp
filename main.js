let timer; // Variable to hold the timer interval
let totalTime = 0; // Variable to hold the total time in seconds

function setTimer() {
  // Get input values
  const days = parseInt(document.getElementById("daysInput").value) || 0;
  const hours = parseInt(document.getElementById("hoursInput").value) || 0;
  const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

  // Convert to seconds and update totalTime
  totalTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;

  // Update timer display
  updateTimerDisplay();
  toggleResetButton(false); // Disable the reset button
}

function startTimer() {
  // Check if timer is already running
  if (timer) return;

  // Update the timer display immediately
  updateTimerDisplay();
  toggleResetButton(false); // Disable the reset button

  // Start the timer
  timer = setInterval(updateTimerDisplay, 1000);
}

function pauseTimer() {
  // Check if timer is running
  if (!timer) return;

  // Pause the timer
  clearInterval(timer);
  timer = null;
  toggleResetButton(true); // Enable the reset button
}

function resetTimer() {
  // Reset all values
  totalTime = 0;
  clearInterval(timer);
  timer = null;
  updateTimerDisplay();
  toggleResetButton(true); // Enable the reset button
}

function updateTimerDisplay() {
  const daysValue = document.getElementById("days");
  const hoursValue = document.getElementById("hours");
  const minutesValue = document.getElementById("minutes");
  const secondsValue = document.getElementById("seconds");

  const days = Math.floor(totalTime / (24 * 60 * 60));
  const hours = Math.floor((totalTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalTime % (60 * 60)) / 60);
  const seconds = totalTime % 60;

  const formattedTime = `${padValue(days)} : ${padValue(hours)} : ${padValue(minutes)} : ${padValue(seconds)}`;

  daysValue.textContent = padValue(days);
  hoursValue.textContent = padValue(hours);
  minutesValue.textContent = padValue(minutes);
  secondsValue.textContent = padValue(seconds);

  // Decrease totalTime by 1 second
  totalTime--;

  // Check if timer has reached 0
  if (totalTime < 0) {
    clearInterval(timer);
    timer = null;
    toggleResetButton(true); // Enable the reset button
  }
}

function toggleInstructions() {
  const instructionsDiv = document.getElementById("instructions");
  instructionsDiv.style.display = instructionsDiv.style.display === "none" ? "block" : "none";
}

function padValue(value) {
  return value.toString().padStart(2, "0");
}

function toggleResetButton(enabled) {
  const resetButton = document.getElementById("reset");
  resetButton.disabled = !enabled;
}

// Call setTimer() function to set the initial timer
setTimer();

// Call setTimeout() function to delay the execution of display() function by 2000 milliseconds (2 seconds)
setTimeout(display, 2000);

// Call setInterval() function to repeatedly execute display() function every 1000 milliseconds (1 second)
var interval = setInterval(display, 1000);

// Call clearInterval() function to stop the timer
clearInterval(interval);
