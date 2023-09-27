const main = document.querySelector('.main');
const url = `https://api.unsplash.com/search/photos?client_id=2bbwhQCaOppcq5YrSvDrxo3auE7Z9YYDmHvP34U1D8I&page=1&per_page=30&query=`;
let searchQuery = 'random';
const search = document.getElementById('search');
const searchIcon = document.querySelector('.search-icon');


async function getData() {
    const res = await fetch(url + searchQuery);
    const data = await res.json();
    addPics(data);
}

function preparePage() {
    for (let i = 0; i < 30; i++){
        const div = document.createElement('div');
        div.classList.add('image-div');
        main.append(div);
        div.addEventListener('click', () => {
            window.open(div.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1], '_blank');
        })
    }
    getData(searchQuery);
}
function addPics(data) {
    const pics = document.querySelectorAll('.image-div');
    Array.from(pics).forEach((el, index) => {
        el.style.backgroundImage = `url(${data.results[index].urls.regular})`;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    preparePage();
    search.focus();
});
search.addEventListener('keydown', () => {
    if (event.key == 'Enter' && search.value.length > 0) {
        searchQuery = search.value;
        getData();
    }
})
searchIcon.addEventListener('click', () => {
    if (search.value.length > 0) {
        searchQuery = search.value;
        getData();
    }
})

document.querySelectorAll('.image-div').forEach((el) => {
    el.addEventListener('click', () => {
        window.open(el.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1], '_blank');
    })
})
