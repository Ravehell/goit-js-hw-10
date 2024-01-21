import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const createPromisBtn = document.querySelector('button');
let inputValue = form.elements.delay;

form.addEventListener('submit', onCreatePromise);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}

function onCreatePromise(event) {
  event.preventDefault();
  let delay = inputValue.value;
  let state = form.elements.state.value;
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        position: 'topRight',
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
      });
    })
    .finally(() => {
      form.reset();
    });

  inputValue.value = '';
}