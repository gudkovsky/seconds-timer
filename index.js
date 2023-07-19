const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("header");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

let timerInterval;

function createTimerAnimator() {
  let seconds = parseInt(inputEl.value) || 0;

  if (seconds < 0) {
    alert("Введите неотрицательное время");
    return;
  }

  if (seconds === 0) {
    alert("Введите значение в поле таймера");
    return;
  } else {
    let totalSeconds = seconds;

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerEl.innerHTML = "Время вышло!";
        return;
      }

      function updateClockAnimation(hours, minutes, seconds) {
        const hourHand = document.querySelector(".hour");
        const minuteHand = document.querySelector(".minute");
        const secondHand = document.querySelector(".second");

        const hourRotation = hours * 30 + minutes * 0.5;
        const minuteRotation = minutes * 6 + seconds * 0.1;
        const secondRotation = seconds * 6;

        hourHand.style.transform = `rotate(-${hourRotation}deg)`;
        minuteHand.style.transform = ` rotate(-${minuteRotation}deg)`;
        secondHand.style.transform = `rotate(-${secondRotation}deg)`;
      }

      let remainingHours = Math.floor(totalSeconds / 3600);
      let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      let remainingSeconds = totalSeconds % 60;

      let formattedHours = String(remainingHours).padStart(2, "0");
      let formattedMinutes = String(remainingMinutes).padStart(2, "0");
      let formattedSeconds = String(remainingSeconds).padStart(2, "0");

      document.getElementById(
        "result"
      ).innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

      updateClockAnimation(remainingHours, remainingMinutes, remainingSeconds);

      totalSeconds--;
    }, 1000);
  }
}

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  let inputValue = inputEl.value;
  let formattedValue = inputValue.replace(/\D/g, "");
  inputEl.value = formattedValue;
});

buttonEl.addEventListener("click", () => {
  createTimerAnimator();
  inputEl.value = "";
});
