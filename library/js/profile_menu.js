import { toggleMenu as toggleBurgerMenu } from "./burger_menu.js";
const iconProfile = document.querySelector('.profile-wrapper');
const profileMenu = document.querySelector('.profile-menu')
const background = document.querySelector('.bg');
const menu = document.querySelector('.menu');

function toggleMenu() { 
    if (event.target == iconProfile && background.classList.contains('bg-hidden') && menu.classList.contains('menu-hidden')) {
        profileMenu.classList.toggle('profile-menu-hidden')
    } else if (event.target != profileMenu && !profileMenu.classList.contains('profile-menu-hidden') && event.target != profileMenu.firstElementChild) {
        profileMenu.classList.add('profile-menu-hidden')
    } else if (event.target == iconProfile && !background.classList.contains('bg-hidden') && !menu.classList.contains('menu-hidden')) {
        toggleBurgerMenu()
        profileMenu.classList.toggle('profile-menu-hidden')
    }
}

document.addEventListener('click', toggleMenu)
