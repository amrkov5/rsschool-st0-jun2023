const selectors = document.querySelectorAll('.selector')
const bookCards = document.querySelectorAll('.books-wrapper');
const buyBtns = document.querySelectorAll('.buy-book-btn');
let activeSeason = 0;
let transitionTarget = 0;
let isAnimating = false;
let newTarget = 0;

function showCard() {
    bookCards[activeSeason].classList.add('books-hidden');
    bookCards[transitionTarget].classList.remove('books-hidden');
    setTimeout(function() {
        bookCards[transitionTarget].classList.add('book-wrapper-visible');
    }, 1)
    activeSeason = transitionTarget;
    isAnimating = false
}

function checkAnimation() {
    if (newTarget != transitionTarget) {
        if (isAnimating) {
            bookCards[activeSeason].addEventListener('transitioncancel', function() {
                console.log(event.target, Array.from(bookCards).includes(event.target));
                if (Array.from(bookCards).includes(event.target)) {
                    console.log('ok')
                    switchSeasons()
                }
            })
            bookCards[activeSeason].classList.add('transition-none');
            bookCards[activeSeason].classList.add('books-hidden');
            bookCards[transitionTarget].classList.remove('books-hidden');
            bookCards[transitionTarget].classList.add('book-wrapper-visible');
            bookCards[activeSeason].classList.remove('transition-none');
            activeSeason = transitionTarget;
            isAnimating = false;
        } else {
            switchSeasons()
        }
    }
}

function switchSeasons() {
    isAnimating = true;
    transitionTarget = newTarget;
    bookCards[activeSeason].addEventListener('transitionend', function() {
        if (Array.from(bookCards).includes(event.target)) {
            showCard()
        }
    });
    bookCards[activeSeason].classList.remove('book-wrapper-visible');
}

selectors.forEach(el => {
    el.addEventListener('click', function() {
        newTarget = Array.from(selectors).indexOf(event.target);
        checkAnimation()
    })
})
