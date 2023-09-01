const modalProfile = document.querySelector('.modal-profile');
const modalCloseBtn = document.querySelector('.profile-main > .modal-close-btn');
const clipboardBtn = document.querySelector('.clipboard-btn');
const background = document.querySelector('.bg');

export function toggleProfile() {
    const background = document.querySelector('.bg');
    const profileBooksList = document.querySelector('.profile-books-list');
    while (profileBooksList.hasChildNodes()) {
        profileBooksList.removeChild(profileBooksList.firstChild);
    }
    if (background.classList.contains('bg-hidden') && modalProfile.classList.contains('modal-hidden')) {
        fillProfileCard()
        background.classList.toggle('bg-hidden');
        modalProfile.classList.toggle('modal-hidden');
    } else if (!background.classList.contains('bg-hidden') && !modalProfile.classList.contains('modal-hidden')) {
        background.classList.toggle('bg-hidden');
        modalProfile.classList.toggle('modal-hidden');
    }
}

function fillProfileCard() {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const currentUser = sessionStorage.getItem('currentUser');
    const profileInitials = document.querySelector('.profile-initials');
    const profileUsername = document.querySelector('.profile-username');
    const userCounters = document.querySelectorAll('.user-info-counter');
    const rentedBooks = document.querySelector('.profile-books-list');
    const cardNumber = document.querySelector('.profile-card-number');
    const bookTitle = document.querySelectorAll('.book-title-author');
    let userFirstName = usersDb[currentUser].firstName;
    let userLastName = usersDb[currentUser].lastName;
    profileUsername.textContent = `${userFirstName} ${userLastName}`;
    profileInitials.textContent = `${userFirstName[0]}${userLastName[0]}`;
    userCounters[0].textContent = usersDb[currentUser].visitAmount;
    userCounters[1].textContent = usersDb[currentUser].bonuses;
    userCounters[2].textContent = usersDb[currentUser].booksBought.length;
    cardNumber.textContent = usersDb[currentUser].cardId;
    usersDb[currentUser].booksBought.map( el => {
        let newBook = document.createElement('li');
        newBook.classList.add('profile-list-el');
        newBook.textContent = bookTitle[el].textContent.replace('By', ' ,').replace('\n','').replace(/ *, */g, ', ');
        rentedBooks.append(newBook);
    })
}

clipboardBtn.addEventListener('click', () => {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    let currentUser = sessionStorage.getItem('currentUser');
    navigator.clipboard.writeText(usersDb[currentUser].cardId);
})
background.addEventListener('click', function() {
    if (!background.classList.contains('bg-hidden')) {
        toggleProfile();
    }
})
modalCloseBtn.addEventListener('click',toggleProfile);