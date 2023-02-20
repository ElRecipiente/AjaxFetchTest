let theMain = document.querySelector("main")

async function updateContent(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    data.articles.forEach(article => {

        if (article.urlToImage != null) {
            let newArticle = document.createElement("article")
            newArticle.innerHTML = `<h2>${article.title}</h2>
        <a href="${article.url}"><img src="${article.urlToImage}" alt=""></a>
        <div>${article.description}</div>
        <p>${(article.author == null) ? "Article édité par un gars qui assume pas" : article.author}</p>`

            theMain.append(newArticle)
        }
    });

}

function changeLanguage(country) {

    theMain.innerHTML = "";
    updateContent(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=publishedAt&apiKey=01af8029b23a47328122793b3e0fdc6a`);

}

updateContent("https://newsapi.org/v2/top-headlines?country=fr&sortBy=publishedAt&apiKey=01af8029b23a47328122793b3e0fdc6a");