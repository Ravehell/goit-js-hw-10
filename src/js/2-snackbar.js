import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function showNotificationError(delay) {
    iziToast.error({
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    timeout: 2000,
    close: false,
    overlay: false,
    displayMode: 'once',
    color: '#EF4040',
    messageColor: '#FFFFFF',
    messageSize: '16px',
        iconColor: '#FFFFFF',
    icon: '',
    theme: 'dark',
    messageLineHeight: '24px',
    iconColor: '#FFFFFF',
    });
}

function showNotificationSuccess(delay) {
    iziToast.success({
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    timeout: 2000,
    close: false,
    overlay: false,
    displayMode: 'once',
    color: '#59A10D',
    messageColor: '#FFFFFF',
    messageSize: '16px',
        iconColor: '#FFFFFF',
    icon: '',
    theme: 'dark',
    messageLineHeight: '24px',
    iconColor: '#FFFFFF',
    });
}

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
    e.preventDefault();
    const delay = Number(e.currentTarget.elements.delay.value);
    const state = e.currentTarget.elements.state.value;
    console.log(state);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            }
            reject(delay);
        }, delay);
    });
    promise
        .then(value => showNotificationSuccess(value))
        .catch(error => showNotificationError(error));
    e.currentTarget.reset();
}