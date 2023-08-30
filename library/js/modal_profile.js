const modalProfile = document.querySelector('.modal-profile');
const modalCloseBtn = document.querySelectorAll('.modal-close-btn');

export function toggleProfile() {
    const background = document.querySelector('.bg');
    fillProfileCard()
    modalProfile.classList.toggle('modal-hidden');
    background.classList.toggle('bg-hidden');
}

function fillProfileCard() {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    let currentUser = sessionStorage.getItem('currentUser');
    const profileInitials = document.querySelector('.profile-initials');
    const profileUsername = document.querySelector('.profile-username');
    const userCounters = document.querySelectorAll('.user-info-counter');
    const rentedBooks = document.querySelector('.profile-books-list');
    const cardNumber = document.querySelector('.profile-card-number');
    let userFirstName = usersDb[currentUser].firstName;
    let userLastName = usersDb[currentUser].lastName;
    profileUsername.textContent = `${userFirstName} ${userLastName}`;
    profileInitials.textContent = `${userFirstName[0]}${userLastName[0]}`;
    userCounters[0].textContent = usersDb[currentUser].visitAmount;
    userCounters[1].textContent = usersDb[currentUser].bonuses;
    userCounters[2].textContent = usersDb[currentUser].booksBought.length;
    cardNumber.textContent = usersDb[currentUser].cardId;
    for ( let i = 0; i < usersDb[currentUser].booksBought.length; i++) {
        let newBook = document.createElement('li');
        newBook.classList.add('profile-list-el');
        newBook.textContent = usersDb[currentUser].booksBought[i].split(' by').join(', ');
        rentedBooks.append(newBook)
    }
}

modalCloseBtn[2].addEventListener('click',toggleProfile);