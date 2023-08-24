const profileRegister = document.querySelector('.menu-text:nth-child(2)');
const btnRegister = document.querySelector('.signup');
const background = document.querySelector('.bg');
const modalRegister = document.querySelector('.modal-register');
const closeModalRegister = document.querySelector('.register-close-btn');

function toggleRegister() {
    if (background.classList.contains('bg-hidden') && modalRegister.classList.contains('modal-register-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-register-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalRegister.classList.contains('modal-register-hidden')) {
        background.classList.toggle('bg-hidden');
        modalRegister.classList.toggle('modal-register-hidden');
    }
}

profileRegister.addEventListener('click', toggleRegister);
btnRegister.addEventListener('click', toggleRegister);
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleRegister();
    }
})
closeModalRegister.addEventListener('click', toggleRegister);
