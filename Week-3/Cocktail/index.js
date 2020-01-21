
function watchForm() {
    let form = $('#cocktailForm');

    form.on('submit', (event)=> {
        event.preventDefault();
        $('#results').empty();
        fetchCocktail();
    })
}

function fetchCocktail() {
    let name = $('#cocktailName').val();
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`

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
    let ingredients = [];
    let quantity = [];
    response.drinks.forEach((el)=> {
        for(let i = 1; i <= 15; ++i) {
            if(el[`strIngredient${i}`] !== null) {
                ingredients.push(el[`strIngredient${i}`]);
                if(el[`strMeasure${i}`]===null) {
                    quantity.push('');
                } else {
                    quantity.push(el[`strMeasure${i}`]); 
                }
            }
        }

        let displayIngredients = "";

        for(let i = 0; i < ingredients.length; ++i) {
            displayIngredients+=`<p>${quantity[i]} of ${ingredients[i]}</p>`;
        }

        container.append(`<div>
                                <h1>${el.strDrink}</h1>
                                <img src="${el.strDrinkThumb}" alt="drinkImage">
                                ${displayIngredients}
                            </div>`);
    })
}

function init() {
    watchForm();
}

init();