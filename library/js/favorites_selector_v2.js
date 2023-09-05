const selectors = document.querySelectorAll('.selector')
const bookCards = document.querySelectorAll('.books-wrapper');
let activeSeason = 0;
let transition = 0;
let newTarget = 0;
let isAnimating = false

function showCard() {
    bookCards[transition].classList.remove('fading-animation');
    bookCards[transition].classList.add('books-hidden');
    bookCards[newTarget].classList.remove('books-hidden');
    bookCards[newTarget].classList.add('showing-animation');
    bookCards[newTarget].addEventListener('animationend', function() {
        bookCards[newTarget].classList.remove('showing-animation');
        isAnimating = false;
    });
    bookCards[newTarget].addEventListener('animationcancel', function() {
        isAnimating = false;
    });
}

function switchSeasons(event) {
    newTarget = Array.from(selectors).indexOf(event.target);
    if(newTarget != activeSeason) {
        if(isAnimating) {
            if(bookCards[transition].classList.contains('fading-animation')) {
                bookCards[transition].classList.remove('fading-animation')
                bookCards[transition].addEventListener('animationcancel', function() {
                    bookCards[transition].classList.add('books-hidden');
                    bookCards[activeSeason].classList.remove('books-hidden');
                    isAnimating = false
                    switchSeasons(event)
                })
            } else if (bookCards[activeSeason].classList.contains('showing-animation')){
                bookCards[activeSeason].classList.remove('showing-animation');
                bookCards[activeSeason].addEventListener('animationcancel', function() {

                    switchSeasons(event)
                })
            }
            
        } else if(!isAnimating) {
            isAnimating = true;
            transition = activeSeason;
            activeSeason = newTarget;
            bookCards[transition].classList.add('fading-animation');
            bookCards[transition].addEventListener('animationend', showCard);
        }
    }
}

selectors.forEach(el => {
    el.addEventListener('click', switchSeasons)
})
