let theMain = document.querySelector("main");
let currentLanguage;
let currentCategory;
let selectLanguage = document.querySelector("select#language");
let selectCategory = document.querySelector("select#category");
let theImg = document.querySelector("nav a img")

async function updateContent(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    data.articles.forEach(article => {

        if (article.urlToImage != null) {
            let newArticle = document.createElement("article")
            newArticle.innerHTML = `<h2>${article.title}</h2>
        <a href="${article.url}"><img src="${article.urlToImage}" alt="Image Indisponible"></a>
        <div>${article.description}</div>
        <p>${(article.author == null) ? "Un illustre inconnu" : article.author}</p>`

            theMain.append(newArticle)
        }
    });

}

async function myGifUpdate(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    theImg.setAttribute("src", `${data.data[Math.floor(Math.random() * 10)].images.original.url}`)
}

myGifUpdate("https://api.giphy.com/v1/gifs/search?api_key=1cK5IjzDd0Q0edYKVZZMwhCONAyfoZq9&q=cat&limit=10&offset=0&rating=g&lang=en");


//change category
selectCategory.addEventListener("change", () => {
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMain.innerHTML = "";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e`);
})


// change language
selectLanguage.addEventListener("change", () => {
    currentLanguage = selectLanguage.value;
    currentCategory = selectCategory.value;
    theMain.innerHTML = "";
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e`);
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
    updateContent(`https://newsapi.org/v2/top-headlines?category=${currentCategory}&country=${currentLanguage}&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e&q=${filter}`);
}, 1000))

updateContent("https://newsapi.org/v2/top-headlines?country=fr&sortBy=publishedAt&apiKey=ae4f0f8e31b3431aa4ba2b3e6021248e");