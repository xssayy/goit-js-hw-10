import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('[data-start]');
btn.classList.add('calendar-btn');
btn.disabled = true;
const input = document.querySelector('#datetime-picker');
input.classList.add('calendar');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (Date.now() < selectedDates[0].getTime()) {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      btn.disabled = true;
    }
    console.log(selectedDates[0].getTime());
  },
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else if (Date.now() < selectedDates[0].getTime()) {
      btn.addEventListener('click', () => {
        startTimer(selectedDates[0]);
      });
    }
  },
};
flatpickr(input, options);

function startTimer(chosenDate) {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  const intervalId = setInterval(() => {
    const {
      days: daysValue,
      hours: hoursValue,
      minutes: minutesValue,
      seconds: secondsValue,
    } = convertMs(chosenDate.getTime() - Date.now());

    days.textContent = `${daysValue}`.padStart(2, '0');
    hours.textContent = `${hoursValue}`.padStart(2, '0');
    minutes.textContent = `${minutesValue}`.padStart(2, '0');
    seconds.textContent = `${secondsValue}`.padStart(2, '0');
    function timeIsUp() {
      const result =
        parseInt(days.textContent) === 0 &&
        parseInt(hours.textContent) === 0 &&
        parseInt(minutes.textContent) === 0 &&
        parseInt(seconds.textContent) === 0;
      return result;
    }
    function stopTimer() {
      clearInterval(intervalId);
    }
    if (timeIsUp() === true) {
      stopTimer();
    }
  }, 1000);

  btn.disabled = true;
  input.disabled = true;
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
