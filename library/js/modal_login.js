import { loginPreparation as logIn, logOutPreparation as logOut } from './LogIn_logOut-preparations.js'
import { toggleRegister } from './modal_register.js'
import { toggleProfile } from './modal_profile.js';
const profileLogIn = document.querySelector('.menu-text:nth-child(1)');
const btnLogIn = document.querySelector('.login');
const background = document.querySelector('.bg');
const modalLogIn = document.querySelector('.modal-login');
const closeModalBtn = document.querySelectorAll('.modal-close-btn');
const pwdInput = document.getElementById('password-login');
const emailInput = document.getElementById('email-login');
const inputLabels = document.querySelectorAll('.modal-input-label');
const logInBtn = document.querySelector('.login-btn');
const registerLink = document.querySelector('.register-link');
const buyBtn = document.querySelectorAll('.buy-book-btn');
let isValidated = true;

export function toggleLogIn() {
    pwdInput.value = '';
    emailInput.value = '';
    for (let i = 4; i < 6; i++) {
        inputLabels[i].classList.remove('modal-input-error');
    }
    if (background.classList.contains('bg-hidden') && modalLogIn.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalLogIn.classList.toggle('modal-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalLogIn.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalLogIn.classList.toggle('modal-hidden');
    }
}

function validateInputsLogIn() {
    isValidated = true;
    inputLabels.forEach(el => {
        el.classList.remove('modal-input-error');
    })
    if (emailInput.value.length == 0) {
        inputLabels[4].classList.add('modal-input-error');
        isValidated = false;
    }
    if (pwdInput.value.length < 8) {
        inputLabels[5].classList.add('modal-input-error');
        isValidated = false;
    }
    if (isValidated) {
        logInUser();
    }
}

function logInUser() {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const isExist =usersDb.find(el => {
        if (emailInput.value.length == 9) {
            if (emailInput.value.toUpperCase() == el.cardId && pwdInput.value == el.password) {
                return true;
            }
        } else {
            if (emailInput.value == el.email && pwdInput.value == el.password) {
                return true;
            }
        }
    })
    if (sessionStorage.getItem('currentUser')) {
        sessionStorage.removeItem('currentUser');
    }
    sessionStorage.setItem('currentUser', JSON.stringify(usersDb.indexOf(isExist)));
    if (isExist) {
        toggleLogIn();
        logIn(usersDb.indexOf(isExist));
    }
}

buyBtn.forEach(el => {
    el.addEventListener('click', function() {
        if (!localStorage.getItem('currentUser')) {
            toggleLogIn();
        }
    })
})

logInBtn.addEventListener('click', validateInputsLogIn)
profileLogIn.addEventListener('click', function() {
    if(profileLogIn.textContent == 'Log In') {
        toggleLogIn()
    } else {
        toggleProfile()
    }
});
btnLogIn.addEventListener('click', toggleLogIn);
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleLogIn();
    }
})
registerLink.addEventListener('click', function() {
    toggleLogIn();
    toggleRegister();
})
closeModalBtn[1].addEventListener('click', toggleLogIn);