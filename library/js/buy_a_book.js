import { updateUserInfo } from './check_user.js';
const booksBtns = document.querySelectorAll('.buy-book-btn');

export function buyBook(target) {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const book = Array.from (booksBtns).indexOf(target);
    const usersBooks = usersDb[currentUser].booksBought;
    usersBooks.push(book);
    usersDb[currentUser].booksBought = usersBooks;
    updateUserInfo(usersDb[currentUser]);
    localStorage.setItem('usersDB', JSON.stringify(usersDb));
    target.classList.add('own-book-btn');
    target.classList.remove('buy-book-btn');
    target.disabled = true;
    target.textContent = 'Own';
}