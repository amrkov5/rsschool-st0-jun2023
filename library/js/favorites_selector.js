const selectors = document.querySelectorAll('.selector')
const bookCards = document.querySelectorAll('.books-wrapper');
let activeSeason = 0;
let transition = 0;
let newTarget = 0

function switchSeasons(event) {
    newTarget = Array.from(selectors).indexOf(event.target);
    transition = activeSeason;
    if (event.target != selectors[activeSeason]) {
        bookCards[activeSeason].classList.add('fading-card');
        bookCards[transition].addEventListener('transitionend', function() {
            bookCards[transition].classList.add('books-hidden');
            bookCards[newTarget].classList.remove('books-hidden');
            bookCards[newTarget].classList.remove('fading-card');
        })
        activeSeason = newTarget;
    }
}



selectors.forEach(el => {
    el.addEventListener('click', switchSeasons)
})
