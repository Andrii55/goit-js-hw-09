const DELAY = 1000;

const refs = {
  btnStartStop: document.querySelectorAll('button[type="button"]'),
};

refs.btnStartStop.forEach(button => {
  button.addEventListener('click', onHandleClick);
});
let intervalId;

function onHandleClick(e) {
  const btnStart = document.querySelector('[data-start]');
  const btnStop = document.querySelector('[data-stop]');
  if (btnStart === e.target && !intervalId) {
    intervalId = setInterval(() => {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, DELAY);
  } else if (btnStop === e.target && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
