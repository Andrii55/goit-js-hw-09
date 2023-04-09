const DELAY = 1000;

const refs = {
  btnStartStopEL: document.querySelectorAll('button[type="button"]'),
  btnStartEL: document.querySelector('[data-start]'),
  btnStopEL: document.querySelector('[data-stop]'),
};

refs.btnStartStopEL.forEach(button => {
  button.addEventListener('click', onHandleClick);
});
let intervalId;

function onHandleClick(e) {
  
  if (refs.btnStartEL === e.target && !intervalId) {
    intervalId = setInterval(() => {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, DELAY);
  } else if (refs.btnStopEL === e.target && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
