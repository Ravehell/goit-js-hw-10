import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// `❌ Rejected promise in ${delay}ms`;
// `✅ Fulfilled promise in ${delay}ms`;

const form = document.querySelector('.form');
// const button = document.querySelector('.snackbar-button');

function createPromise(event) {
    event.preventDefault();
    const delay = (document.getElementsByName('delay')[0]).value;
    const promiseTypes = document.querySelectorAll('input[name="state"]');
    let selectedValue;
    Array.from(promiseTypes).forEach(option => {
        if (option.checked) {
            selectedValue = option.value;
        }
    });

    const promise = new Promise((resolve, reject) => {
        if (isNaN(delay) || delay >= 0) {
            setTimeout(() => {
                if (selectedValue === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        }
    })
    promise
        .then((result) => {
            iziToast.show({
                title: `✅ Fulfilled promise in ${result}ms`,
                position: "topRight",
            })
        })
            .catch((error) => {
                iziToast.show({
                    title: `❌ Rejected promise in ${error}ms`,
                    position: "topRight",
                })
            })
}
            
form.addEventListener('submit', createPromise);