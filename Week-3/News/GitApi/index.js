
function watchForm() {
    let form = $('#gitForm');

    form.on('submit', (event)=> {
        event.preventDefault();
        $('#results').empty();
        fetchProfile();
    })
}

function fetchProfile() {
    let name = $('#gitName').val();
    let url = `https://api.github.com/users/${name}/repos`

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
    let container = $('#results');
    response.forEach((el)=> {


        container.append(`<div>
                                <h3>${el.name}</h3>
                                <a href="https://github.com/${el.full_name}" target="_blank">https://github.com/${el.full_name}</a>
                            </div>`);
    })
}

function init() {
    watchForm();
}

init();