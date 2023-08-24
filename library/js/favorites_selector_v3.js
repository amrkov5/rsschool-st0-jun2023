const selectors = document.querySelectorAll('.selector')
const bookCards = document.querySelectorAll('.books-wrapper');
let activeSeason = 0;
let transition = 0;
let newTarget = 0;
isAnimating = false

function showCard() {
    bookCards[transition].classList.remove('fading-animation');
    bookCards[transition].classList.add('books-hidden');
    bookCards[newTarget].classList.remove('books-hidden');
    bookCards[newTarget].classList.add('showing-animation');
    bookCards[newTarget].addEventListener('animationend', function() {
        bookCards[newTarget].classList.remove('showing-animation');
        activeSeason = newTarget;
        isAnimating = false;
    });
}

function switchSeasons() {
    if (!isAnimating) {
        isAnimating = true;
        transition = activeSeason;
        bookCards[transition].classList.add('fading-animation');
        bookCards[transition].addEventListener('animationend', showCard);
    }
}

selectors.forEach(el => {
    el.addEventListener('click', switchSeasons)
    el.addEventListener('click', function() {
        newTarget = Array.from(selectors).indexOf(event.target);
    })
})
