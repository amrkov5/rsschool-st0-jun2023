import { loginPreparation as logIn, logOutPreparation as logOut } from './LogIn_logOut-preparations.js'
import { toggleLogIn } from './modal_login.js'
const profileRegister = document.querySelector('.menu-text:nth-child(2)');
const btnRegister = document.querySelector('.signup');
const background = document.querySelector('.bg');
const modalRegister = document.querySelector('.modal-register');
const closeModalRegister = document.querySelector('.modal-close-btn');
const pwdInput = document.getElementById('password');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('e-mail');
const inputLabels = document.querySelectorAll('.modal-input-label');
const registerBtn = document.querySelector('.register-btn');
const logInLink = document.querySelector('.login-link');
let isValidated = true;

export function toggleRegister() {
    pwdInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    for (let i = 0; i < 4; i++) {
        inputLabels[i].classList.remove('modal-input-error');
    }
    if (background.classList.contains('bg-hidden') && modalRegister.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalRegister.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-hidden');
    }
}

function validateInputs() {
    isValidated = true;
    const firstLastNamePattern = /^[a-zA-Z\-\s]{2,30}$/;
    const emailPattern = /^[\w\-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}(?:\.[a-zA-Z]{2,4})?$/;
    inputLabels.forEach(el => {
        el.classList.remove('modal-input-error');
    })
    if (!firstLastNamePattern.test(firstNameInput.value)) {
        inputLabels[0].classList.add('modal-input-error');
        isValidated = false;
    }
    if (!firstLastNamePattern.test(lastNameInput.value)) {
        inputLabels[1].classList.add('modal-input-error');
        isValidated = false;
    }
    if (!emailPattern.test(emailInput.value)) {
        inputLabels[2].classList.add('modal-input-error');
        isValidated = false;
    }
    if (pwdInput.value.length < 8) {
        inputLabels[3].classList.add('modal-input-error');
        isValidated = false;
    }
    if (isValidated) {
        registerUser()
    }
}

function generateCardID() {
    return Math.floor(Math.random() * 0xFFFFFFFFF).toString(16).toUpperCase();    
}

function registerUser() {
    let usersDb = []
    let userObj = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: pwdInput.value,
        cardId: generateCardID(),
        visitAmount: 0,
        bonuses: 0,
        booksBought: [],
        isCardActive: false,
    }
    if (!localStorage.getItem('usersDB')) {
        usersDb.push(userObj);
        localStorage.setItem('usersDB', JSON.stringify(usersDb));
    } else {
        usersDb = JSON.parse(localStorage.getItem('usersDB'));
        usersDb.push(userObj);
        localStorage.setItem('usersDB', JSON.stringify(usersDb));
    }
    if (sessionStorage.getItem('currentUser')) {
        sessionStorage.removeItem('currentUser');
    }
    sessionStorage.setItem('currentUser', JSON.stringify(usersDb.indexOf(userObj)));
    toggleRegister()
    logIn(usersDb.indexOf(userObj))
}

profileRegister.addEventListener('click', function() {
    if (profileRegister.textContent == 'Register') {
        toggleRegister()
    } else {
        logOut()
    }
});
btnRegister.addEventListener('click', toggleRegister);
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleRegister();
    }
})
closeModalRegister.addEventListener('click', toggleRegister);
registerBtn.addEventListener('click', validateInputs)
logInLink.addEventListener('click', function() {
    toggleRegister();
    toggleLogIn();
})