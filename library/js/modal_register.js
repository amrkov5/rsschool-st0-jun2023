import { loginPreparation as logIn } from './LogIn_logOut-preparations.js'
const profileRegister = document.querySelector('.menu-text:nth-child(2)');
const btnRegister = document.querySelector('.signup');
const background = document.querySelector('.bg');
const modalRegister = document.querySelector('.modal-register');
const closeModalRegister = document.querySelector('.register-close-btn');
const pwdInput = document.getElementById('password');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('e-mail');
const inputLabels = document.querySelectorAll('.register-input-label');
const registerBtn = document.querySelector('.register-btn');
let isValidated = true;

function toggleRegister() {
    pwdInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    if (background.classList.contains('bg-hidden') && modalRegister.classList.contains('modal-register-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-register-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalRegister.classList.contains('modal-register-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-register-hidden');
    }
}

function validateInputs() {
    isValidated = true;
    const firstLastNamePattern = /^[a-zA-Z\-\s]{2,30}$/;
    const emailPattern = /^[\w\-_.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}(?:\.[a-zA-Z]{2,4})?$/;
    inputLabels.forEach(el => {
        el.classList.remove('register-input-error');
    })
    if (!firstLastNamePattern.test(firstNameInput.value)) {
        inputLabels[0].classList.add('register-input-error');
        isValidated = false;
    }
    if (!firstLastNamePattern.test(lastNameInput.value)) {
        inputLabels[1].classList.add('register-input-error');
        isValidated = false;
    }
    if (!emailPattern.test(emailInput.value)) {
        inputLabels[2].classList.add('register-input-error');
        isValidated = false;
    }
    if (pwdInput.value.length < 8) {
        inputLabels[3].classList.add('register-input-error');
        isValidated = false;
    }
    if (isValidated) {
        registerUser()
    }
}

function generateCardID() {
    return Math.floor(Math.random() * 0xFFFFFFFFF).toString(16);    
}

function registerUser() {
    let usersDb = []
    let userObj = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: pwdInput.value,
        cardId: generateCardID(),
        visitAmount: 1,
        bonuses: 0,
        booksBought: [],
    }
    if (!localStorage.getItem('usersDB')) {
        usersDb.push(userObj);
        localStorage.setItem('usersDB', JSON.stringify(usersDb));
    } else {
        usersDb = JSON.parse(localStorage.getItem('usersDB'));
        usersDb.push(userObj);
        localStorage.setItem('usersDB', JSON.stringify(usersDb));
    }
    if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
    }
    localStorage.setItem('currentUser', JSON.stringify(userObj));
    toggleRegister()
    logIn(userObj)
}

profileRegister.addEventListener('click', toggleRegister);
btnRegister.addEventListener('click', toggleRegister);
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleRegister();
    }
})
closeModalRegister.addEventListener('click', toggleRegister);
registerBtn.addEventListener('click', validateInputs)
