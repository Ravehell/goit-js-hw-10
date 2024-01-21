import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      validate(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

function showNotificationError() {
    iziToast.error({
    message: 'Please choose a date in the future',
    position: 'topRight',
    timeout: 2000,
    close: false,
    overlay: false,
    displayMode: 'once',
    color: '#EF4040',
    messageColor: '#FFFFFF',
    messageSize: '16px',
    iconColor: '#FFFFFF',
    theme: 'dark',
    messageLineHeight: '24px',
    iconColor: '#FFFFFF',
    });
}

let userSelectedDate;

const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('[data-datetime]');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
btnStart.addEventListener('click', onBtnStartClick);

function validate(selectedDate) { 
  const currentDate = new Date();
      if (selectedDate < currentDate) {
          btnStart.classList.remove('active-btn');
            showNotificationError();
          return;
        }
      userSelectedDate = selectedDate;
  btnStart.classList.add('active-btn');
  btnStart.disabled = false;
}

function onBtnStartClick() { 
  inputDate.disabled = true;
  inputDate.classList.add('datetime-picker-disable');
  btnStart.classList.remove('active-btn');
  btnStart.disabled = true;
  const time = userSelectedDate.getTime();
        const timer = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = time - currentTime;
            const timeComponents = convertMs(deltaTime);
            if (deltaTime <= 0) {
              clearInterval(timer);
              inputDate.disabled = false;
              inputDate.classList.remove('datetime-picker-disable');
                return;
            }
          updateClockface(timeComponents);
        }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) { 
    valueDays.textContent = `${addLeadingValue(days)}`;
    valueHours.textContent = `${addLeadingValue(hours)}`;
    valueMinutes.textContent = `${addLeadingValue(minutes)}`;
    valueSeconds.textContent = `${addLeadingValue(seconds)}`;
}

function addLeadingValue(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}