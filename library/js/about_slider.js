const sliderBtn = document.querySelectorAll('.paginator');
const sliderArrows = document.querySelectorAll('.carret');
const slider = document.querySelector('.image-wrapper-inner');
let offset = 0;
let btnPosition = 0;
console.log(sliderBtn[btnPosition])

function offsetWithButtons(event) {
    const btnArr = Array.from(sliderBtn);
    btnArr.forEach(el => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        }
    })
    event.target.classList.add('active');
    offset = 450 * btnArr.indexOf(event.target) + 25 * btnArr.indexOf(event.target);
    slider.style.left = `${-offset}px`;
    btnPosition = btnArr.indexOf(event.target);
}

function offsetWithArrows(event) {
    if (event.target == sliderArrows[0] && offset != 0) {
        offset -= 475;
        sliderBtn[btnPosition].classList.remove('active');
        btnPosition -= 1;
    } else if (event.target == sliderArrows[1] && offset != 1900){
        offset += 475;
        sliderBtn[btnPosition].classList.remove('active');
        btnPosition += 1;
    }
    slider.style.left = `${-offset}px`; 
    sliderBtn[btnPosition].classList.add('active');
}

sliderArrows.forEach(el => {
    el.addEventListener('click', offsetWithArrows);
})

sliderBtn.forEach((el) => {
    el.addEventListener('click', offsetWithButtons);
})