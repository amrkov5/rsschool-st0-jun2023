const brgrMenu = document.querySelector('.brgr-menu');
const menu = document.querySelector('.menu');
const background = document.querySelector('.bg')
const menuLinks = document.querySelectorAll('.nav-list-link')



function toggleMenu() {
    brgrMenu.classList.toggle('brgr-menu__opened');
    menu.classList.toggle('menu-hidden')
    background.classList.toggle('bg-hidden')
}
console.log(menuLinks)
brgrMenu.addEventListener('click', toggleMenu)
document.addEventListener('click', function (event) {
    if (event.target in menuLinks) {
        console.log('123')
    }
})