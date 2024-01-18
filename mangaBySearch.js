const apiUrl = 'https://api.jikan.moe/v4';
const imgUrl = 'https://cdn.myanimelist.net/images/manga/';
const main = document.getElementById('main');
let searchQuery = document.getElementById('userSearch');

function fetchManga(query) {
    let pageNum = 1;
    let pagesToFetch = 0;
    //console.log(query);

    const fetchPages = async () => {
        try {
            const initialResponse = await fetch(`https://api.jikan.moe/v4/manga?q=*${query}*&page=${pageNum}&sfw`);
            if (!initialResponse.ok) {
                throw new Error(`HTTP error! Status: ${initialResponse.status}`);
            }

            const initialData = await initialResponse.json();
            console.log(initialData);
            pagesToFetch = initialData.pagination.last_visible_page;

            const fetchPromises = [];
            for (let i = 1; i <= pagesToFetch; i++) {
                fetchPromises.push(fetchWithDelay(`https://api.jikan.moe/v4/manga?q=*${query}*&page=${i}&sfw`, i * 800));
            }

            const allPagesData = await Promise.all(fetchPromises);
            const allData = allPagesData.reduce((accumulator, pageData) => accumulator.concat(pageData.data), []);

            showManga(allData, query);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchPages();
}

function fetchWithDelay(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        }, delay);
    });
}

function showManga(data, query) {
    try {
        main.innerHTML = '';

        data.forEach(manga => {
            const {
                title,
                scored,
                images,
            } = manga;
            const largeImageUrl = manga.images.jpg.large_image_url;

            //some japanese titles have translations to english that contain the query
            //which is why some titles show up in japanese

            const mangaElement = document.createElement('div');
            mangaElement.classList.add('manga');
            mangaElement.innerHTML = `
                <img id=imgPlaceholder src="${largeImageUrl}">

                <div class="manga-info">
                    <h3 id="mangaTitlePlaceholder">${title}</h3>
                    <span id="rating">${scored}</span>
                </div>
            `;

            main.appendChild(mangaElement);
            
        });
    } catch (error) {
        console.error('Error in showManga:', error);
    }

    searchQuery.innerHTML = query;
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const query = document.getElementById('searchForm').value.trim();
    if (query !== '') {
        fetchManga(query);
    }
}
