const sliderBtn = document.querySelectorAll('.paginator');
const sliderArrows = document.querySelectorAll('.carret');
const slider = document.querySelector('.image-wrapper-inner');
let offset = 0;
console.log(sliderArrows)

function offsetWithButtons(event) {
    const btnArr = Array.from(sliderBtn);
    btnArr.forEach(el => {
        if (el.classList.contains('active')) {
            el.classList.remove('active')
        }
    })
    sliderBtn[btnArr.indexOf(event.target)].classList.toggle('active')
    offset = 450 * btnArr.indexOf(event.target) + 25 * btnArr.indexOf(event.target)
    slider.style.left = `${-offset}px`
}

function offsetWithArrows(event) {

}

sliderArrows.forEach(el => {
    el.addEventListener('click', function() {
        console.log(event)
    })
})

sliderBtn.forEach((el) => {
    el.addEventListener('click', offsetWithButtons);
})