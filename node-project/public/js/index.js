function loadStudents() {
    let url = "/api/students";
    let settings = {
        method: "GET",
    };
    fetch(url, settings)
        .then( response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then( responseJSON => {
            displayResults( responseJSON);
        });

        // let settings = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': "application/json",
        //     },
        //     body: JSON.stringify(obj)
        // };
}

// $.ajax({
//     method: "POST",
//     url: url,
//     data: JSON.stringify(obj),
//     contentType: "application/json",
//     dataType: "json"
// })

function displayResults(response) {
    $('#studentList').empty();

    response.forEach((el)=> {
        $('#studentList').append(`<li>
                                        ${el.nombre}
                                        ${el.apellido}
                                    </li>`)
    })
}

function init() {
    loadStudents();
}

init();