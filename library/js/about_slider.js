const sliderBtn = document.querySelectorAll('.paginator');
const sliderArrows = document.querySelectorAll('.carret');
const slider = document.querySelector('.image-wrapper-inner');
let offset = 0;
let btnPosition = 0;
slider.style.left = `0`;

function offsetWithButtons(event) {
    const btnArr = Array.from(sliderBtn);
    slider.style.left = `${-offset}px`;
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
    if (offset == 1900) {
        sliderArrows[1].classList.add('carret-incative');
    } else {
        sliderArrows[1].classList.remove('carret-incative');
    }
    if (offset == 0) {
        sliderArrows[0].classList.add('carret-incative');
    } else {
        sliderArrows[0].classList.remove('carret-incative');
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