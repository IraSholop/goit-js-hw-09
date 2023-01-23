import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector("input[name='delay']");
const delayStep = document.querySelector("input[name='step']");
const amount = document.querySelector("input[name='amount']");

form.addEventListener('submit', onResultMessage);

function onResultMessage(evt) {
  evt.preventDefault();
  let delay = Number(firstDelay.value);
  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += Number(delayStep.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}
