import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMin = document.querySelector('[data-minutes]');
const dataSec = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

startBtn.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  disable: ['2022'],
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

input.disabled = false;
flatpickr(input, options);
let idTime;

function onStartTimer() {
  startBtn.disabled = true;
  input.disabled = true;
  idTime = setInterval(() => {
    const time = new Date(input.value);
    const timeNow = Date.now();
    const ms = time - timeNow;
    if (ms < 0) {
      clearInterval(idTime);
      return;
    }
    timeForUser(ms);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function timeForUser(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMin.textContent = minutes;
  dataSec.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
