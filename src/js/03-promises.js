import * as notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  if (!delay || !step || !amount) {
    notiflix.Notify.failure('All fields are required and must be numbers');
    return;
  }

  const promises = Array.from({ length: amount }, (_, i) => {
    const position = i + 1;
    const currentDelay = delay + step * i;
    return createPromise(position, currentDelay);
  });

  notiflix.Notify.info(`Creating ${promises.length} promises...`);

  Promise.all(promises)
    .then(results => {
      notiflix.Notify.success(`${results.length} promises fulfilled`);
    })
    .catch(error => {
      notiflix.Notify.failure(
        `${error.position} promise rejected after ${error.delay}ms`
      );
    });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        notiflix.Notify.success(
          `Promise ${position} fulfilled after ${delay}ms`
        );
        resolve({ position, delay });
      } else {
        notiflix.Notify.failure(
          `Promise ${position} rejected after ${delay}ms`
        );
        reject({ position, delay });
      }
    }, delay);
  });
}
