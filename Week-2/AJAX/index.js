
function fetchDog2() {
    let url = 'https://dog.ceo/api/breeds/image/random';
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

function fetchDog() {

    let url = 'https://dog.ceo/api/breeds/image/random';
    let settings = {
        method: "GET"
    };

    fetch(url, settings)
        .then((response)=> {
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText);
        })
        .then((responseJSON)=> {
            displayResults( responseJSON);
        });
}

function displayResults(responseJSON) {
    let results = $('.results');
    $(results).html(`
        <h1> Your random image </h1>
        <p>
            <img src="${responseJSON.message}" />
        </p>
    `);
}

function watchForm() {
    
    let form = $('#randomDog');

    $(form).on('submit', (event)=> {
        event.preventDefault();

        fetchDog2();
    })
}

function init() {
    watchForm();
}

init();