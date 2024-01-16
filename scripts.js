const apiUrl = 'https://api.jikan.moe/v4/top/manga';
const imgUrl = 'https://cdn.myanimelist.net/images/manga/';
const main = document.getElementById('main');

fetchTopManga();

function fetchTopManga() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            showTopManga(data.data);
            //const titles = data.data.map(manga => manga.title);
            //const ratings = data.data.map(manga => manga.score);
            //const imgs = data.data.map(manga => manga.images.jpg.large_image_url);
            //updateTitlePlaceholder(titles, ratings, imgs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/*
function updateTitlePlaceholder(titles, ratings, imgs) {
    // Assuming you have an element with id "mangaTitlePlaceholder"
    const titlePlaceholder = document.getElementById('mangaTitlePlaceholder');
    const ratingPlaceholder = document.getElementById('rating');
    const imgPlaceholder = document.getElementById('imgPlaceholder');
    // Update the title placeholder content
    titlePlaceholder.textContent = titles[0];
    ratingPlaceholder.textContent = ratings[0];
    imgPlaceholder.setAttribute('src', imgs[0]);
}
*/
// Call the function to fetch and update the title placeholder


function showTopManga(data){
    main.innerHTML= '';

    data.forEach(manga => {
        const{
            title,
            score,
            images,
        } = manga;

        const largeImageUrl = manga.images.jpg.image_url;

        const mangaElement = document.createElement('div');
        mangaElement.classList.add('manga');
        mangaElement.innerHTML = `
            <img id=imgPlaceholder src="${largeImageUrl}">

            <div class="manga-info">
                <h3 id="mangaTitlePlaceholder">${title}</h3>
                <span id="rating">${score}</span>
            </div>
        `

        main.appendChild(mangaElement);
    });
}
