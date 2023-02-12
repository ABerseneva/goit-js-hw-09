import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    input: document.getElementById('datetime-picker'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]')
}
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
       refs.startBtn.disabled = true;
      } else {
      Notiflix.Notify.success('Click "Start"');
        refs.startBtn.disabled = false;
      }
  },
};

refs.startBtn.addEventListener('click', onClick);

const fp = flatpickr(refs.input, options)

function calculeteDeltaTime() {
  const selectetDate = fp.selectedDates[0];
  const currentTime = Date.now();
  const startTime = selectetDate.getTime();
  const deltaTime = startTime - currentTime;
  console.log(deltaTime);

  return deltaTime;
};

function onClick() {
  refs.startBtn.disabled = true;
  const intervalId = setInterval(() => {
    const deltaTime = calculeteDeltaTime();
    if (deltaTime >= 0) {
      showTimer(deltaTime);
    } else {
      clearInterval(intervalId);
      Notiflix.Notify.success('Time is up!');
    }
  }, 1000);
};


function showTimer(ms) {
  const timeInterval = convertMs(ms);
  addLeadingZero(timeInterval);
};

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

  // return { days, hours, minutes, seconds };

  refs.daysRemaining.textContent = days;
  refs.hoursRemaining.textContent = hours;
  refs.minutesRemaining.textContent = minutes;
  refs.secondsRemaining.textContent = seconds;
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

