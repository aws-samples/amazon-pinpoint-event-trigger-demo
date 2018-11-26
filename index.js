import { recordEvent, registerEndpoint, initializeAmplify } from './amplify_setup';

initializeAmplify();

const setupFormListeners = () => {

    const registerForm = document.getElementById('register-form');
    const eventForm = document.getElementById('event-form');
    const emailRadio = document.getElementById('email');
    const phoneRadio = document.getElementById('phone');
    const emailInput = document.querySelector('.email-input');
    const phoneInput = document.querySelector('.phone-input');

    emailRadio.addEventListener('click', (e) => {
        emailInput.classList.remove('hidden');
        emailInput.required = true;
        phoneInput.classList.add('hidden');
        phoneInput.required = false;
    });

    phoneRadio.addEventListener('click', (e) => {
        phoneInput.classList.remove('hidden');
        phoneInput.required = true;
        emailInput.classList.add('hidden');
        emailInput.required = false;
    });

    addFormListener(registerForm);
    addFormListener(eventForm);
};

const addFormListener = (form) => {
    form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const data = formatData(formData);
        if (e.target.id === 'register-form') {
            registerEndpoint(data);
        }
        if (e.target.id === 'event-form') {
            recordEvent();
        }
        e.preventDefault();
    });
};

const formatData = (data) => {
    const dataObject = {};
    for (let pair of data) {
        dataObject[pair[0]] = pair[1];
    }
    return dataObject;
};

setupFormListeners();
