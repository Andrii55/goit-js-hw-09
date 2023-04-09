import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import '/node_modules/notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputELL: document.querySelector('#datetime-picker'),
  buttonELL: document.querySelector('button[type="button"][data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let selectedDate;
let countdownIntervalId;

refs.inputELL.addEventListener('focus', onHandeleFocus);

function onHandeleFocus() {
  const selector = refs.inputELL;
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate && selectedDate >= new Date()) {
        refs.buttonELL.removeAttribute('disabled');
        refs.buttonELL.classList.add('active');
      } else {
        refs.buttonELL.setAttribute('disabled', '');
        refs.buttonELL.classList.remove('active');
      }
    },
  };
  flatpickr(selector, options);
}

function onHandeleClick() {
  const currentDate = new Date();
  if (!selectedDate || selectedDate.getTime() < currentDate.getTime()) {
    Notiflix.Notify.failure(
      'Вибрана дата має бути більша або дорівнювати поточній даті.'
    );

    return;
  } else {
    Notiflix.Notify.success('Дата успішно валідована.');

    const countdown = () => {
      const now = new Date().getTime();
      const distance = selectedDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(countdownIntervalId);
        refs.daysValue.innerText = '00';
        refs.hoursValue.innerText = '00';
        refs.minutesValue.innerText = '00';
        refs.secondsValue.innerText = '00';
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(distance);
      refs.daysValue.innerText = addLeadingZero(days);
      refs.hoursValue.innerText = addLeadingZero(hours);
      refs.minutesValue.innerText = addLeadingZero(minutes);
      refs.secondsValue.innerText = addLeadingZero(seconds);
    };
    countdown();
    countdownIntervalId = setInterval(countdown, 1000);
  }
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
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.buttonELL.addEventListener('click', onHandeleClick);

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
