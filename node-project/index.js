let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

app = express();

app.use( express.static('public'));
app.use(morgan('dev'));

let estudiantes = [{
    nombre: "Miguel",
    apellido: "Angeles",
    matricula: 1730939
},
{
    nombre: "Erick",
    apellido: "Gonzales",
    matricula: 1039859
},
{
    nombre: "Victor",
    apellido: "Villarreal",
    matricula: 1039863
},
{
    nombre: "Victor",
    apellido: "Cardenas",
    matricula: 816350
}];

app.get("/api/students", ( req, res ) => {

    return res.status(200).json(estudiantes);
});

app.get("/api/getByName/:name", (req, res)=>{
    let name = req.params.name;

    let result = estudiantes.filter((elemento) => {
        if(elemento.nombre == name) {
            return elemento;
        }
    });

    if(result.length > 0){
        return res.status(200).json(result);
    } else {
        res.statusMessage = "El alumno no se encuentra en la lista";
        return res.status(404).send();
    }
})

app.post('/api/newStudent', jsonParser, (req, res)=> {
    if(!req.body.hasOwnProperty('nombre') || !req.body.hasOwnProperty('apellido') || !req.body.hasOwnProperty('matricula')) {
        return res.status(406).send();
    }
    let matriculas = estudiantes.map(function(estudiante) {
        return estudiante.matricula;
    })

    if(matriculas.includes(req.body.matricula)) {
        return res.status(409).send();
    }

    let {nombre, apellido, matricula} = req.body;

    estudiantes.push({
        "nombre": nombre,
        "apellido": apellido,
        "matricula": matricula
    });
    return res.status(201).json(req.body);
})

app.put('/api/updateStudent/:id', jsonParser, (req, res)=> {
    if(!req.body.hasOwnProperty('matricula') || (!req.body.hasOwnProperty('nombre') && !req.body.hasOwnProperty('apellido'))) {
        return res.status(406).send();
    }

    if(req.body.matricula != req.params.id) {
        return res.status(409).send();
    }

    let result = estudiantes.find((elemento) => {
        if(elemento.matricula == req.params.id) {
            return elemento;
        }
    });

    if(result === undefined) {
        return res.status(404).send();
    }

    if(req.body.hasOwnProperty('nombre'))
    result.nombre = req.body.nombre;
    if(req.body.hasOwnProperty('apellido'))
    result.apellido = req.body.apellido;

    return res.status(202).json(result);
})

app.delete("/api/deleteStudent", jsonParser, (req, res) =>{
    console.log(estudiantes);
    if(!req.body.hasOwnProperty('matricula')) {
        return res.status(406).send();
    }

    if(req.body.matricula != req.query.id) {
        return res.status(409).send();
    }

    let result = estudiantes.find((elemento) => {
        if(elemento.matricula == req.query.id) {
            return elemento;
        }
    });

    if(result === undefined) {
        return res.status(404).send();
    }

    estudiantes.splice(estudiantes.findIndex((el)=> {
        el.matricula == req.query.id;
    }),1);
    console.log(estudiantes);
    return res.status(204).send();


})

app.listen(8080, ()=>{
    console.log("Server has started in port 8080");
})