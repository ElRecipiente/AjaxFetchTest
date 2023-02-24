let theMainDiv = document.querySelector("main > div");
let theLastDiv = document.querySelector("main > div:last-child")
let currentLanguage;
let currentCategory;
let selectLanguage = document.querySelector("select#language");
let selectCategory = document.querySelector("select#category");
let theImg = document.querySelector("nav a img")
let showMoreOrLessButton = document.getElementById("showButton");
let data;
let showMore = false;
let whatIsShown = 0;
let maxShownArticles = 10;
let maxLength = whatIsShown + 3;
let arrowButtons = document.querySelectorAll("main button");
let searchBarNeedAReset = false;

async function updateContent(url) {
    let response = await fetch(url);
    data = await response.json();
    console.log(data);
    for (let i = 0; i < data.articles.length; i++) {
        if (data.articles[i].urlToImage == null) {
            data.articles.splice(i, 1);
        }
    }
    showArticles(whatIsShown);
}

function showArticles(i) {

    if (searchBarNeedAReset) {
        theMainDiv.innerHTML = `<img src="img/404.jpg" alt="Pas d'articles disponibles avec cette recherche.">`
    }

    else {

        for (i; i < maxLength; i++) {

            let newArticle = document.createElement("article")
            newArticle.innerHTML = `<h2>${data.articles[i].title}</h2>
            <a href="${data.articles[i].url}"><img src="${data.articles[i].urlToImage}" alt="Image Indisponible"></a>
            <div>${data.articles[i].description}</div>
            <p>${(data.articles[i].author == null) ? "Un illustre inconnu" : data.articles[i].author}</p>`

            newArticle.style.opacity = "1";

            theMainDiv.append(newArticle)

        }
    }
}

function showMustGoOn() {
    if (showMore) {
        for (let i = 0; i < data.articles.length; i++) {

            if (data.articles[i].urlToImage != null) {

                let newArticle = document.createElement("article")
                newArticle.innerHTML += `<h2>${data.articles[i].title}</h2>
        <a href="${data.articles[i].url}"><img src="${data.articles[i].urlToImage}" alt="Image Indisponible"></a>`
                setTimeout(() => {
                    newArticle.style.opacity = "1"
                }, (i * 100));
                theLastDiv.append(newArticle)
            }
        }
    }
}

function pressRightButton() {
    if (whatIsShown < maxShownArticles) {
        whatIsShown += 1;
        maxLength = whatIsShown + 3
        theMainDiv.innerHTML = "";
        showArticles(whatIsShown);
    }
}

function pressLeftButton() {
    if (whatIsShown > 0) {
        whatIsShown -= 1;
        maxLength = whatIsShown + 3
        theMainDiv.innerHTML = "";
        showArticles(whatIsShown);
    }
}

function showMoreOrLess() {

    if (!showMore) {
        showMore = true;
        theLastDiv.innerHTML = "";
        showMustGoOn();
        showMoreOrLessButton.textContent = "Show Less";
    }
    else {
        showMore = false;
        theLastDiv.innerHTML = "";
        showMustGoOn();
        showMoreOrLessButton.textContent = "Show All";
    }
}

async function myGifUpdate(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    theImg.setAttribute("src", `${data.data[Math.floor(Math.random() * 10)].images.original.url}`)
}


//change category
selectCategory.addEventListener("change", () => {
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMainDiv.innerHTML = "";
    showMore = false;
    showMoreOrLessButton.textContent = "Show All";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=21e825da1415461e9ea84507ccbcb84a`);
})


// change language
selectLanguage.addEventListener("change", () => {
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMainDiv.innerHTML = "";
    showMore = false;
    showMoreOrLessButton.textContent = "Show All";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=21e825da1415461e9ea84507ccbcb84a`);
})

const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

let searchInput = document.querySelector("#searchBar");

//filter on searchBar
searchInput.addEventListener("input", debounce(() => {
    searchBarNeedAReset = false;
    let filter = searchInput.value;
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMainDiv.innerHTML = "";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=21e825da1415461e9ea84507ccbcb84a&q=${filter}`);
    if (theMainDiv.innerHTML == "") {
        theMainDiv.innerHTML = `<img src="img/404.jpg" alt="Pas d'articles disponibles avec cette recherche.">`
        searchBarNeedAReset = true;
    }
}, 1000))

updateContent("https://newsapi.org/v2/top-headlines?country=fr&sortBy=publishedAt&apiKey=21e825da1415461e9ea84507ccbcb84a");
myGifUpdate("https://api.giphy.com/v1/gifs/search?api_key=1cK5IjzDd0Q0edYKVZZMwhCONAyfoZq9&q=newspaper&limit=10&offset=0&rating=g&lang=en");