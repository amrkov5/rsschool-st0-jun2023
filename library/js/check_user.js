const chkBtn = document.querySelector('.chk_card');
const nameInput = document.querySelector('.name');
const cardInput = document.querySelector('.card-number');

function checkUsersInfo() {
    const usersDb = JSON.parse(localStorage.getItem('usersDB'));
    const userInfo = document.querySelector('.user-info');
    const userCounters = document.querySelectorAll('.user-info-counter');
    foundUser = usersDb.find(element => { 
        if (cardInput.value.toLowerCase() == element.cardId && nameInput.value.toLowerCase() == `${element.firstName} ${element.lastName}`.toLocaleLowerCase()) {
            return true
        }
    });
    if (foundUser) {
        chkBtn.classList.toggle('user-info-hidden');
        userInfo.classList.toggle('user-info-hidden');
        userCounters[0].textContent = `${foundUser.visitAmount}`;
        userCounters[1].textContent = `${foundUser.bonuses}`;
        userCounters[2].textContent = `${foundUser.booksBought.length}`
        setTimeout( function() {
            chkBtn.classList.toggle('user-info-hidden');
            userInfo.classList.toggle('user-info-hidden');
            nameInput.value = '';
            cardInput.value = '';
        },10000)
    }
}

chkBtn.addEventListener('click', checkUsersInfo)
nameInput.addEventListener('input', function() {
    if (nameInput.value.length > 0) {
        nameInput.classList.add('name-typing');
    }
})
cardInput.addEventListener('input', function() {
    if (cardInput.value.length > 0) {
        cardInput.classList.add('card-number-typing');

    }
})