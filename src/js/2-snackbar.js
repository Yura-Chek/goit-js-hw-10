import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = parseInt(delayInput.value);
    const state = [...stateRadios].find(radio => radio.checked)?.value;

    if (isNaN(delay) || !state) {
        return; 
    }

    const promise = createPromise(delay, state);

    promise
        .then((resolvedDelay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
                position: 'topRight',
            });
        })
        .catch((rejectedDelay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${rejectedDelay}ms`,
                position: 'topRight',
            });
        });
});