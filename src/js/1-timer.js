import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let timerDays = document.querySelector('[data-days]');
let timerHours = document.querySelector('[data-hours]');
let timerMinutes = document.querySelector('[data-minutes]');
let timerSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    startBtn.disabled = false;
    startBtn.addEventListener('click', startCounter);
    if (selectedDates[0] < Date.now()) {
      iziToast.warning({
        position: 'topCenter',
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      return;
    } else if (event.target.nodeName !== 'button') {
      return;
    } else {
      startCounter();
    }
  },
};

export const fp = flatpickr(inputDate, options);

function startCounter(event) {
  iziToast.success({
    position: 'topCenter',
    title: 'OK',
    message: 'A Good Choice!',
  });

  startBtn.disabled = true;
  inputDate.disabled = true;
  let intervalId = null;

  let userSelectedDate = fp.selectedDates[0];

  intervalId = setInterval(() => {
    let currentTime = Date.now();

    let deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      inputDate.disabled = false;
      startBtn.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    timerDays.textContent = pad(days);
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(seconds);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}