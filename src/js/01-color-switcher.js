const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');
let intervalId;

setElementAttribute(stoptBtn, 'disabled', true);

startBtn.addEventListener('click', onClikChangeColor);
stoptBtn.addEventListener('click', onClikStopChangeColor);

function onClikChangeColor() {
  if (startBtn.getAttribute('disabled')) {
    return;
  }

  setElementAttribute(startBtn, 'disabled', true);
  setElementAttribute(stoptBtn, 'disabled', false);

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClikStopChangeColor() {
  if (!startBtn.getAttribute('disabled')) {
    return;
  }

  setElementAttribute(startBtn, 'disabled', false);
  setElementAttribute(stoptBtn, 'disabled', true);

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setElementAttribute(elementRef, attributeName, valueOfAttribute) {
  if (valueOfAttribute) {
    elementRef.setAttribute(attributeName, `${valueOfAttribute}`);
  } else {
    elementRef.removeAttribute(attributeName);
  }
}
