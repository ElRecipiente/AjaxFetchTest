let theMain = document.querySelector("main");
let currentLanguage;
let currentCategory;
let selectLanguage = document.querySelector("select#language");
let selectCategory = document.querySelector("select#category");
let theImg = document.querySelector("nav a img")
let showMoreOrLessButton = document.querySelector("footer button");
let data;
let showMore = false;
let maxLength;

async function updateContent(url) {
    let response = await fetch(url);
    data = await response.json();
    console.log(data);
    showArticles();
}

function showArticles() {

    if (!showMore) {
        maxLength = 3;
        for (let i = 0; i < maxLength; i++) {

            if (data.articles[i].urlToImage == null) {
                maxLength = maxLength + 1;
                console.log("brouette")
            }

            else if (data.articles[i].urlToImage != null) {
                let newArticle = document.createElement("article")
                newArticle.innerHTML = `<h2>${data.articles[i].title}</h2>
        <a href="${data.articles[i].url}"><img src="${data.articles[i].urlToImage}" alt="img/404.jpg"></a>
        <div>${data.articles[i].description}</div>
        <p>${(data.articles[i].author == null) ? "Un illustre inconnu" : data.articles[i].author}</p>`
                setTimeout(() => {
                    newArticle.style.opacity = "1"
                }, (i * 200));
                theMain.append(newArticle)
            }
        }
    }

    else {

        for (let i = maxLength; i < data.articles.length; i++) {

            if (data.articles[i].urlToImage != null) {
                let newArticle = document.createElement("article")
                newArticle.innerHTML += `<h2>${data.articles[i].title}</h2>
        <a href="${data.articles[i].url}"><img src="${data.articles[i].urlToImage}" alt="Image Indisponible"></a>
        <div>${data.articles[i].description}</div>
        <p>${(data.articles[i].author == null) ? "Un illustre inconnu" : data.articles[i].author}</p>`
                setTimeout(() => {
                    newArticle.style.opacity = "1"
                }, (i * 200));
                theMain.append(newArticle)
            }
        }
    }
}

function showMoreOrLess() {

    if (!showMore) {
        showMore = true;
        showArticles();
        showMoreOrLessButton.textContent = "Show Less";
    }
    else {
        showMore = false;
        theMain.innerHTML = "";
        showArticles();
        showMoreOrLessButton.textContent = "Show More";
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
    theMain.innerHTML = "";
    showMore = false;
    showMoreOrLessButton.textContent = "Show More";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=c80cfc2928404db29d71bf9af9cdc196`);
})


// change language
selectLanguage.addEventListener("change", () => {
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMain.innerHTML = "";
    showMore = false;
    showMoreOrLessButton.textContent = "Show More";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=c80cfc2928404db29d71bf9af9cdc196`);
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

    let filter = searchInput.value;
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMain.innerHTML = "";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=c80cfc2928404db29d71bf9af9cdc196&q=${filter}`);
}, 1000))

updateContent("https://newsapi.org/v2/top-headlines?country=fr&sortBy=publishedAt&apiKey=c80cfc2928404db29d71bf9af9cdc196");
myGifUpdate("https://api.giphy.com/v1/gifs/search?api_key=1cK5IjzDd0Q0edYKVZZMwhCONAyfoZq9&q=newspaper&limit=10&offset=0&rating=g&lang=en");