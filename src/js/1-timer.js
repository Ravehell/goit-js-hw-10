import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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


const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button')

let userSelectedDate;
let timerInterval;

// налаштування flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      clearInterval(timerInterval);
        if (userSelectedDate.getTime() <= new Date().getTime()) {
            iziToast.error({
            message: "Please choose a date in the future",
            position: "topRight"
            });
          button.setAttribute("disabled", true);
          
        } else {
          button.removeAttribute("disabled");
        }
    },
};

// створено flatpickr
const datePckr = flatpickr('#datetime-picker', options);



function startTimer() {
  input.setAttribute("disabled", true);

  timerInterval = setInterval(updateTimer, 1000);
  button.disabled = true;
}

// оновлення таймеру 1
function updateTimer() {
  const now = new Date().getTime();
  const timeDifference = userSelectedDate.getTime() - now;

  if (timeDifference > 0) {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  } else {
    clearInterval(timerInterval);
    updateTimerDisplay(0, 0, 0, 0);
    iziToast.success({
      title: 'Timer Finished',
    });
  }
}

//функція для додавання нуля перед числом
function addZero(value) {
  return value < 10 ? `0${value}` : value;
}

// функція для оновлення таймеру 2
function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').innerText = addZero(days);
  document.querySelector('[data-hours]').innerText = addZero(hours);
  document.querySelector('[data-minutes]').innerText = addZero(minutes);
  document.querySelector('[data-seconds]').innerText = addZero(seconds);
}

button.addEventListener('click', () => {
  if (userSelectedDate <= 0) {
    iziToast.error({
      message: "Please choose a date in the future",
      position: "topRight"
      });
  }
  const timeDifference = userSelectedDate.getTime() - new Date().getTime();
  if (timeDifference > 0) {
    startTimer();
  }
});


// Дякую!