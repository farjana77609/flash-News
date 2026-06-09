const IS_LOCAL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const BASE_URL = IS_LOCAL
  ? "https://newsdata.io/api/1/latest"
  : "/.netlify/functions/news";

const topBtn = document.querySelector(".move-top-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function showPreloader() {
  document.getElementById("preloader").style.display = "flex";
}

function hidePreloader() {
  document.getElementById("preloader").style.display = "none";
}

const CATEGORY_PARAMS = ["education", "crime", "entertainment", "finance", "politics", "sports"];

async function fetchNews(query) {
  showPreloader();
  try {
    const isCategory = CATEGORY_PARAMS.includes(query);
    let params;
    if (IS_LOCAL) {
      params = new URLSearchParams({ apikey: API_KEY });
      isCategory ? params.set("category", query) : params.set("q", query);
    } else {
      params = new URLSearchParams({ query, isCategory });
    }
    const res = await fetch(`${BASE_URL}?${params}`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (data.status === "success" && data.results?.length) {
      const articles = data.results.map((article) => ({
        title: article.title || "No title",
        description: article.description || "No description available",
        urlToImage: article.image_url || "https://via.placeholder.com/400x200",
        url: article.link,
        publishedAt: article.pubDate,
        source: { name: article.source_name || "NewsData" },
      }));
      bindData(articles);
    } else {
      throw new Error(data.message || "No results found");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = `<div class="alert alert-danger">Failed to load news: ${error.message}</div>`;
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
  newsImg.onerror = () => { newsImg.src = "./assets/placeholder.avif"; };
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
window.addEventListener("load", () => {
  fetchNews("top");
});
