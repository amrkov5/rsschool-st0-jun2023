const brgrMenu = document.querySelector('.brgr-menu');
const menu = document.querySelector('.menu');
const background = document.querySelector('.bg');
const menuLinks = document.querySelectorAll('.nav-list-link');
const profileIcon = document.querySelector('.icon-profile');

export function toggleMenu() {
    brgrMenu.classList.toggle('brgr-menu__opened');
    menu.classList.toggle('menu-hidden');
    background.classList.toggle('bg-hidden');
};
brgrMenu.addEventListener('click', toggleMenu);
background.addEventListener('click', toggleMenu);

menuLinks.forEach(el => el.addEventListener('click', function() {
    if(!background.classList.contains('bg-hidden') && !menu.classList.contains('menu-hidden')) {
        toggleMenu();
    };
}));