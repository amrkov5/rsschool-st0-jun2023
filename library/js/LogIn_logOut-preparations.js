import { updateUserInfo, toggleUserInfo } from './check_user.js';

export function loginPreparation(userIndex) {
    const menuHead = document.querySelector('.menu-head');
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const firstName = usersDb[userIndex].firstName;
    const lastName = usersDb[userIndex].lastName;
    const userInitials = firstName.charAt(0) + lastName.charAt(0);
    const profileInitials = document.querySelector('.profile_initials');
    const profileIcon = document.querySelector('.icon-profile');
    const menuText = document.querySelectorAll('.menu-text');
    const bookCardBtn = document.querySelectorAll('.buy-book-btn');
    const getCardHead = document.querySelector('.get-card');
    const getCardText = document.querySelectorAll('.get-card-text');
    const getCardBtns = document.querySelectorAll('.get-card-btn');
    profileIcon.classList.add('icon_profile_hidden');
    profileInitials.classList.remove('icon_profile_hidden');
    profileInitials.textContent = `${userInitials}`;
    document.querySelector('.profile-wrapper').title = `${firstName} ${lastName}`;
    menuHead.textContent = usersDb[userIndex].cardId;
    menuHead.classList.add('menu-head-cardid');
    menuText[0].textContent = 'My profile';
    menuText[1].textContent = 'Log Out';
    usersDb[userIndex].booksBought.forEach(el => {
        bookCardBtn[el].classList.add('own-book-btn');
        bookCardBtn[el].classList.remove('buy-book-btn');
        bookCardBtn[el].disabled = true;
    })
    updateUserInfo(usersDb[userIndex]);
    toggleUserInfo();
    getCardHead.textContent = 'Visit your profile';
    getCardText.forEach(el => [
        el.classList.toggle('get-card-text-hidden')
    ])
    getCardBtns.forEach(el => {
        el.classList.toggle('get-card-btn-hidden');
    })
    localStorage.setItem('usersDB',JSON.stringify(usersDb))
}

export function logOutPreparation() {
    const profileInitials = document.querySelector('.profile_initials');
    const menuHead = document.querySelector('.menu-head');
    const profileIcon = document.querySelector('.icon-profile');
    const menuText = document.querySelectorAll('.menu-text');
    const bookCardBtn = document.querySelectorAll('.own-book-btn');
    const getCardHead = document.querySelector('.get-card');
    const getCardText = document.querySelectorAll('.get-card-text');
    const getCardBtns = document.querySelectorAll('.get-card-btn');
    profileIcon.classList.remove('icon_profile_hidden');
    profileInitials.classList.add('icon_profile_hidden');
    profileInitials.textContent = '';
    menuText[0].textContent = 'Log In';
    menuText[1].textContent = 'Register';
    menuHead.textContent = 'Profile';
    toggleUserInfo()
    bookCardBtn.forEach(el => {
        if (el.classList.contains('own-book-btn')) {
            el.disabled = false;
            el.classList.remove('own-book-btn');
            el.classList.add('buy-book-btn');
        }
    })
    getCardHead.textContent = 'Get a reader card';
    getCardText.forEach(el => [
        el.classList.toggle('get-card-text-hidden')
    ])
    getCardBtns.forEach(el => {
        el.classList.toggle('get-card-btn-hidden');
    })
    sessionStorage.removeItem('currentUser');
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('currentUser')) {
        loginPreparation(JSON.parse(sessionStorage.getItem('currentUser')));
    }
})