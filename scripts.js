function fetchTopManga() {
    const apiUrl = 'https://api.jikan.moe/v4/top/manga';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const titles = data.data.map(manga => manga.title);
            const ratings = data.data.map(manga => manga.score);
            const imgs = data.data.map(manga => manga.images.jpg.large_image_url);
            updateTitlePlaceholder(titles, ratings, imgs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

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

// Call the function to fetch and update the title placeholder
fetchTopManga();

