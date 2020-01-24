const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const { StudentList } = require('./model')

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

    StudentList.getAll()
        .then(studentList => {
            return res.status(200).json(studentList);
        })
        .catch( error => {
            res.statusMessage = "Hubo un error de conexion con la BD.";
            return res.status(500).send();
        });

});

app.get("/api/getById/:id", (req,res) => {
    let id = req.params.id;

    StudentList.getById(id)
        .then( student => {
            if(student === null) {
                return res.status(404).send();
            }
            return res.status(200).json(student);
        })
        .catch( error => {
            res.statusMessage = "Hubo un error de conexion con la BD.";
            return res.status(500).send();
        })
})

app.get("/api/getByName/:name", (req, res)=>{
    let name = req.params.name;

    StudentList.getByName(name)
        .then( student => {
            if(student.length < 1) {
                res.status(404).send();
            }
            return res.status(200).json(student);
        })
        .catch( error => {
            res.statusMessage = "Hubo un error de conexion con la BD.";
            return res.status(500).send();
        })
})

app.post('/api/newStudent', jsonParser, (req, res)=> {
    if(!req.body.hasOwnProperty('nombre') || !req.body.hasOwnProperty('apellido') || !req.body.hasOwnProperty('matricula')) {
        return res.status(406).send();
    }

    StudentList.getById(req.body.matricula)
        .then( student => {
            if(student != null) {
                res.statusMessage = "Ese estudiante ya esta registrado.";
                return res.status(409).send();
            }
        
            let {nombre, apellido, matricula} = req.body;
        
            let estudiante = {
                "nombre": nombre,
                "apellido": apellido,
                "matricula": matricula
            };
        
            StudentList.createNewStudent(estudiante)
                .then( student => {
                    return res.status(201).json(student);
                })
                .catch( error => {
                    res.statusMessage = "Hubo un error de conexion en la BD.";
                    return res.status(500).send();
                })
        })
        .catch( error => {
            res.statusMessage = "Hubo un error de conexion con la BD.";
            return res.status(500).send();
        });
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

let server;

function runServer(port, databaseUrl){
    return new Promise( (resolve, reject ) => {
        mongoose.connect(databaseUrl, response => {
            if ( response ){
                return reject(response);
            }
            else{
                server = app.listen(port, () => {
                    console.log( "App is running on port " + port );
                    resolve();
                })
                .on( 'error', err => {
                    mongoose.disconnect();
                    return reject(err);
                })
            }
        });
    });
   }
   
   function closeServer(){
        return mongoose.disconnect()
            .then(() => {
                return new Promise((resolve, reject) => {
                    console.log('Closing the server');
                    server.close( err => {
                        if (err){
                            return reject(err);
                        }
                        else{
                            resolve();
                        }
                    });
                });
            });
   }

   runServer(8080, "mongodb://localhost/university");

   module.exports = { app, runServer, closeServer }