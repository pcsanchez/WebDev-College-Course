
function fetchNews() {
    let keyWord = $('#keyWord').val();
    let url = 'https://newsapi.org/v2/everything?' +
    `q=${keyWord}&` +
    'from=2020-01-20&' +
    'sortBy=popularity&' +
    'apiKey=6180d0e5701b41bda0bc9dc62528f18b';

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function displayResults(response) {
    let container = $('#news');
    response.articles.forEach((el) => {
        container.append(`<div>
                                <h3>Title: ${el.title}</h3>
                                <img src="${el.urlToImage}" alt="News Photo">
                                <p>Author: ${el.author}</p>
                                <p>Description: ${el.description}</p>
                            </div>`);
    })
}


function watchForm() {

    $('#newsForm').on('submit', (event)=> {
        event.preventDefault();
        $('#news').empty();
        fetchNews();
    })
}

function init() {
    watchForm();
}

init();