import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('input#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

setElementAttribute(startBtn, 'disabled', true);

const timer = {
  startDateTime: Date.now(),

  isDateCorrect() {
    if (this.selectedDateTime > this.startDateTime) {
      setElementAttribute(startBtn, 'disabled', false);
    } else {
      setElementAttribute(startBtn, 'disabled', true);
      Notiflix.Report.warning(
        'Warning!',
        'Please choose a date in the future',
        'Ok'
      );
    }
  },
  onClickStartTimer() {
    setElementAttribute(startBtn, 'disabled', true);

    const intervalId = setInterval(() => {
      const dateDifference = this.selectedDateTime - Date.now();
      if (dateDifference >= 0) {
        const { days, hours, minutes, seconds } = convertMs(dateDifference);
        daysRef.textContent = this.addLeadingZero(days);
        hoursRef.textContent = this.addLeadingZero(hours);
        minutesRef.textContent = this.addLeadingZero(minutes);
        secondsRef.textContent = this.addLeadingZero(seconds);
      } else {
        clearInterval(intervalId);
        secondsRef.textContent = '00';
      }
    }, 1000);
  },
  addLeadingZero(value) {
    if (value < 100) {
      return value.toString().padStart(2, '0');
    } else {
      return value;
    }
  },
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.selectedDateTime = selectedDates[0].getTime();
    timer.isDateCorrect.call(timer);
  },
};
const fpck = flatpickr(dateTimePicker, options);

startBtn.addEventListener('click', timer.onClickStartTimer.bind(timer), {
  once: true,
});

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

function setElementAttribute(elementRef, attributeName, valueOfAttribute) {
  if (valueOfAttribute) {
    elementRef.setAttribute(attributeName, `${valueOfAttribute}`);
  } else {
    elementRef.removeAttribute(attributeName);
  }
}
