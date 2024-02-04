import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input');

form.addEventListener('submit', event => {
  event.preventDefault();
  const state = form.querySelector("[name='state']:checked").value;
  const delay = input.value;
  const promise = createPromise(delay, state);
  promise
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled  promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
      });
    });
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}
