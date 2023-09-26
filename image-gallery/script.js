const main = document.querySelector('.main');
const url = `https://api.unsplash.com/search/photos?client_id=2bbwhQCaOppcq5YrSvDrxo3auE7Z9YYDmHvP34U1D8I&page=1&per_page=30&query=`
let searchQuery = 'random'
const search = document.getElementById('search');


async function getData() {
    const res = await fetch(url + searchQuery);
    const data = await res.json();
    addPics(data)
}
getData()

function preparePage() {
    for (let i = 0; i < 30; i++){
        const div = document.createElement('div');
        div.classList.add('image-div');
        main.append(div);
        div.addEventListener('click', () => {
            window.open(div.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1], '_blank');
        })
    }
    getData(searchQuery)
}
function addPics(data) {
    const pics = document.querySelectorAll('.image-div');
    let i = 0;
    Array.from(pics).forEach((el) => {
        el.style.backgroundImage = `url(${data.results[i].urls.regular})` 
        i++;
    })
}


document.addEventListener('DOMContentLoaded', () => {
    preparePage();
    search.focus();
});
search.addEventListener('keydown', () => {
    if (event.key == 'Enter') {
        searchQuery = search.value;
        getData();
    }
})

document.querySelectorAll('.image-div').forEach((el) => {
    el.addEventListener('click', () => {
        alert('123')
        window.open(el.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1], '_blank');
    })
})
