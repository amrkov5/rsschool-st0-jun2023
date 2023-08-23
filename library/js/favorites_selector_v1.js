const selectors = document.querySelectorAll('.selector')
const bookCards = document.querySelectorAll('.books-wrapper');
let activeSeason = 0;
let transition = 0;
let newTarget = 0;
let isAnimating = false


function switchSeasons(event) {
    newTarget = Array.from(selectors).indexOf(event.target);
    if(newTarget != activeSeason) {
        if(!isAnimating) {
            isAnimating = true;
            transition = activeSeason;
            activeSeason = newTarget;
            bookCards[transition].classList.add('fading-card');
            bookCards[transition].addEventListener('transitionend', function() {
                bookCards[transition].classList.add('books-hidden');
                bookCards[newTarget].classList.remove('books-hidden');
                setTimeout(function() {
                    bookCards[newTarget].classList.add('transition-on')
                    bookCards[newTarget].classList.remove('fading-card');
                    bookCards[newTarget].classList.remove('transition-on')
                    isAnimating = false;
                }, 1);
            })
        }
    }
}


selectors.forEach(el => {
    el.addEventListener('click', switchSeasons)
})
