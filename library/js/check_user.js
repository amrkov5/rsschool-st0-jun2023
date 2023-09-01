const chkBtn = document.querySelector('.chk_card');
const nameInput = document.querySelector('.name');
const cardInput = document.querySelector('.card-number');

function checkUsersInfo() {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const foundUser = usersDb.find(element => {
        if (cardInput.value == element.cardId && nameInput.value.toLowerCase().trim() == `${element.firstName} ${element.lastName}`.toLocaleLowerCase()) {
            return true
        }
    });
    if (foundUser) {
        toggleUserInfo();
        updateUserInfo(foundUser);
        setTimeout( function() {
            toggleUserInfo();
            nameInput.value = '';
            cardInput.value = '';
        },10000)
    }
}

export function updateUserInfo(foundUser) {
    const userCounters = document.querySelectorAll('.user-info-counter');
    userCounters[3].textContent = `${foundUser.visitAmount}`;
    userCounters[4].textContent = `${foundUser.bonuses}`;
    userCounters[5].textContent = `${foundUser.booksBought.length}`
}

export function toggleUserInfo() {
    const userInfo = document.querySelector('.user-info');
    chkBtn.classList.toggle('user-info-hidden');
    userInfo.classList.toggle('user-info-hidden');
}

chkBtn.addEventListener('click', checkUsersInfo)
nameInput.addEventListener('input', function() {
    if (nameInput.value.length > 0) {
        nameInput.classList.add('name-typing');
    } else nameInput.classList.remove('name-typing');
})
cardInput.addEventListener('input', function() {
    if (cardInput.value.length > 0) {
        cardInput.classList.add('card-number-typing');
    } else cardInput.classList.add('card-number-typing');
})