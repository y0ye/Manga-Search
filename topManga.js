const apiUrl = 'https://api.jikan.moe/v4';
const imgUrl = 'https://cdn.myanimelist.net/images/manga/';
const main = document.getElementById('main');

function fetchTopManga() {
    fetch(apiUrl + "/top/manga")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            showTopManga(data.data);
        
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

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