const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const User = require("./user");
const { randomInt } = require('crypto');

async function iniciar(){
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Conectado a la base de datos");

        app.listen(port, () => {
        console.log("Escuchando a puerto " + port);
});
    }
    catch(error){
        console.log("Error de conexion a la base de datos: " + error);
    }
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>HOLA</h1>');
});

app.post('/crear', (req, res) => {
    const body = req.body
    console.log(body)
    const nombreUsuario = body.nombre
    const nivelUsuario = body.nivel
    const claseUsuario = body.clase
    crearUsuario({nombre: nombreUsuario, nivel: nivelUsuario, clase: claseUsuario})
    res.send('usuario creado con exito')
})

async function crearUsuario(usuarioTraido)
{
    const nombrePj = usuarioTraido.nombre;
    const nivelPj = usuarioTraido.nivel;
    const clasePj = usuarioTraido.clase;
const usuaruio = await User.create({nombre: nombrePj, nivel: nivelPj, clase: clasePj});
console.log("Usuario creado: " + usuaruio);
}

iniciar();
