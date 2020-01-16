
function formLogic() {
    let form = $('#number-chooser');

    $(form).on('submit', (event)=> {
        event.preventDefault();
        $('.js-results').empty();
        let number = $('#number-choice').val();
        let results = $('.js-results');

        for(let i = 1; i <= number; ++i) {
            if(i%15 === 0) {
                $(results).append(`<div class="fizz-buzz-item fizzbuzz"><span>FizzBuzz</span></div>`);
            } else if ( i%5 === 0) {
                $(results).append(`<div class="fizz-buzz-item buzz"><span>Buzz</span></div>`);
            } else if (i%3 === 0) {
                $(results).append(`<div class="fizz-buzz-item fizz"><span>Fizz</span></div>`);
            } else {
                $(results).append(`<div class="fizz-buzz-item"><span>` + i + `</span></div>`);
            }
        }
    });
}

function init() {
    formLogic();
}

$(init);