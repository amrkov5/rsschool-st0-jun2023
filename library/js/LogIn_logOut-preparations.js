export function loginPreparation(userIndex) {
    const menuHead = document.querySelector('.menu-head');
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const firstName = usersDb[userIndex].firstName;
    const lastName = usersDb[userIndex].lastName;
    const userInitials = firstName.charAt(0) + lastName.charAt(0);
    const profileInitials = document.querySelector('.profile_initials');
    const profileIcon = document.querySelector('.icon-profile');
    const menuText = document.querySelectorAll('.menu-text');
    const bookCardBtn = document.querySelectorAll('.buy-book-btn')
    profileIcon.classList.add('icon_profile_hidden');
    profileInitials.classList.remove('icon_profile_hidden');
    profileInitials.textContent = `${userInitials}`;
    document.querySelector('.profile-wrapper').title = `${firstName} ${lastName}`;
    usersDb[userIndex].visitAmount = usersDb[userIndex].visitAmount +1;
    menuHead.textContent = usersDb[userIndex].cardId;
    menuHead.classList.add('menu-head-cardid');
    menuText[0].textContent = 'My profile';
    menuText[1].textContent = 'Log Out';
    localStorage.setItem('usersDB',JSON.stringify(usersDb))
}

export function logOutPreparation() {
    const profileInitials = document.querySelector('.profile_initials');
    const menuHead = document.querySelector('.menu-head');
    const profileIcon = document.querySelector('.icon-profile');
    const menuText = document.querySelectorAll('.menu-text');
    profileIcon.classList.remove('icon_profile_hidden');
    profileInitials.classList.add('icon_profile_hidden');
    profileInitials.textContent = '';
    menuText[0].textContent = 'Log In';
    menuText[1].textContent = 'Register';
    menuHead.textContent = 'Profile';
    sessionStorage.removeItem('currentUser');
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('currentUser')) {
        loginPreparation(JSON.parse(sessionStorage.getItem('currentUser')));
    }
})