const background = document.querySelector('.bg');
const modalCloseBtn = document.querySelector('.modal-head-part > .modal-close-btn')
const buyCardBtn = document.querySelector('.buy-card-btn');
const buyCardInputs = document.querySelectorAll('.card-form > .modal-input, .buy-card-exp-code > .modal-input, .user-form > .modal-input');
let isInputValidated = false;

export function toggleBuyCard() {
    const modalBuyCard = document.querySelector('.modal-buy-card');
    buyCardInputs.forEach(el => {
        el.value = '';
    })
    if (background.classList.contains('bg-hidden') && modalBuyCard.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalBuyCard.classList.toggle('modal-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalBuyCard.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalBuyCard.classList.toggle('modal-hidden');
    }
}

function validateCardInput() {
    const cardNumberInput = document.getElementById('card-number');
    const expCodeMonth = document.getElementById('exp-code-month');
    const expCodeYear = document.getElementById('exp-code-year');
    const cvcCode = document.getElementById('cvc-code');
    const digitsPattern = /[0-9]/;
    if (!digitsPattern.test(cvcCode.value[cvcCode.value.length - 1]) || cvcCode.value.length > 3) {
        cvcCode.value = cvcCode.value.slice(0, cvcCode.value.length-1)
    }
    if (!digitsPattern.test(expCodeYear.value[expCodeYear.value.length - 1]) || expCodeYear.value.length > 2) {
        expCodeYear.value = expCodeYear.value.slice(0, expCodeYear.value.length-1)
    }
    if (!digitsPattern.test(expCodeMonth.value[expCodeMonth.value.length - 1]) || expCodeMonth.value.length > 2) {
        expCodeMonth.value = expCodeMonth.value.slice(0, expCodeMonth.value.length-1)
    }
    if (!digitsPattern.test(cardNumberInput.value[cardNumberInput.value.length - 1]) || cardNumberInput.value.length > 19) {
        cardNumberInput.value = cardNumberInput.value.slice(0, cardNumberInput.value.length-1)
    }
    for (let i = 1; i < 4; i++) {
        if ((cardNumberInput.value.length  == 4 || cardNumberInput.value.length == 9 || cardNumberInput.value.length == 14)  && cardNumberInput.value.length < 19) {
            cardNumberInput.value += ' ';
        }
    }
    buyCardInputs.forEach(el => {
        if (el.value.length > 0) {
            isInputValidated = true;
        } else {
            isInputValidated = false
        }
        if (isInputValidated) {
            buyCardBtn.removeAttribute('disabled');
        }
    })
}

buyCardInputs.forEach(el => {
    el.addEventListener('input', validateCardInput);
})
buyCardBtn.addEventListener('click', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    usersDb[currentUser].isCardActive = true;
    localStorage.setItem('usersDB', JSON.stringify(usersDb));
    toggleBuyCard();
})
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleBuyCard();
    }
})
modalCloseBtn.addEventListener('click',toggleBuyCard);