const API_KEY = "10e711ac-bd77-4dd0-8925-e1e783572978";
const url = "https://content.guardianapis.com/search?q=";


const topBtn = document.querySelector(".move-top-btn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});
topBtn.addEventListener("click", () => {   
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showPreloader() {
    document.getElementById('preloader').style.display = 'flex';
}

function hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
}

async function fetchNews(query) {
    showPreloader();
    try {
        const timestamp = new Date().getTime();
        const res = await fetch(`${url}${query}&api-key=${API_KEY}&show-fields=thumbnail,headline,bodyText,trailText&page-size=20&t=${timestamp}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.response && data.response.results) {
            const articles = data.response.results.map(article => ({
                title: article.webTitle,
                description: article.fields?.trailText || "No description available",
                urlToImage: article.fields?.thumbnail || "placeholder-image-url.jpg",
                url: article.webUrl,
                publishedAt: article.webPublicationDate,
                source: { name: 'The Guardian' }
            }));
            bindData(articles);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = `<div class="alert alert-danger">
            Failed to load news: ${error.message}
        </div>`;
    } finally {
        hidePreloader();
    }
}   

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function reload() {
    window.location.reload();
}

// Load default news on page load
window.addEventListener('load', () => {
    fetchNews('general');
});
