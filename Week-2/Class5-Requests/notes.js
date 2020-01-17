// fetch(url, settings).then((response) => {})
// settings --> 
// {
// method: "GET",
// body: .....,
// headers:
// }
fetch(url, settings).then((response)=> {
    console.log(response)
    if(response.ok) {
        return response.json();
    }
    throw newError(response.statusText);
}).then((responseJSON)=> {
    console.log(responseJSON);
}).catch

$.ajax({
    url: url,
    method: "GET",
    data: "Datos a enviar",
    ContentTye: "Tipo de dato que se envia al servidor",
    dataType: "Tipo de dato que recibimos del servidor",
    success: function(responseJSON) {
        
    },
    error: function(err) {

    }
});