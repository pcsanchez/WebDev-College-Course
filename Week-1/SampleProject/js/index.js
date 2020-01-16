
function logValidation(selectedInput) {
    switch(selectedInput.getAttribute('id')) {
        case 'firstNameInput':
            
    }
}

function watchForm() {

    // let form = document.getElementById('commentForm');

    // console.log(form.elements);

    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();

    //     let valid = true;

    //     if(document.getElementById('firstNameInput').value === "") {
    //         console.log('Proporciona tu nombre');
    //         document.getElementById('firstNameField').innerHTML += "<span class=\"notValid\"> te la comes </span>"
    //         valid = false;
    //     }

    //     if(document.getElementById('lastNameInput').value === "") {
    //         console.log('Proporciona tu apellido');
    //         valid = false;
    //     }

    //     if(document.getElementById('emailInput').value === "") {
    //         console.log('Proporciona tu correo');
    //         valid = false;
    //     }

    //     if(document.getElementById('phonenumberInput').value === "") {
    //         console.log('Proporciona tu numero de telefono');
    //         valid = false;
    //     }

    //     if(document.getElementById('emailInput').value === "") {
    //         console.log('Proporciona tu correo');
    //         valid = false;
    //     }

    //     if(document.getElementById('rate').value === "pls") {
    //         console.log('Porfavor selecciona una opcion');
    //         valid = false;
    //     }

    //     if(document.getElementById('commentTextArea').value === "") {
    //         console.log('Porfavor deja tu comentario');
    //         valid = false;
    //     }

    //     if(document.getElementById('yesInput').checked === false && document.getElementById('noInput').checked === false) {
    //         console.log("Porfavor elige una opcion");
    //         valid = false;
    //     }


        
    // });
}

function init() {
    watchForm();
}

init();