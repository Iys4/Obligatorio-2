const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const evento = require("./evento");
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

app.get('/', async (req, res) => {
    try {
    const eventos = await evento.find(); // get all documents
    res.status(200).json(eventos);       // send them as JSON
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).send('Error al obtener los eventos');
  }
});

app.delete("/eventos/:id", async (req, res) => {
    try {
    const params = req.params;
    console.log(params);
    await evento.findByIdAndDelete(params.id);
    res.send("Usuario eliminando con exito" + params.id);
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).send('Error al eliminar el evento');
    }
});

app.post('/crear', async (req, res) => {
    const body = req.body
    const nombreEvento = body.nombreEvento
    const linkImagen = body.linkImagen
    const fecha = body.fecha
    const descripcion = body.descripcion
    const precio = body.precio
    const location = body.location
    const categoria = body.categoria
    if (!nombreEvento || !linkImagen || !fecha || !descripcion || !precio || !location || !categoria) {
        return res.status(400).send('Faltan datos obligatorios');
    }
    const eventoNuevo = await evento.create({nombreEvento: nombreEvento, linkImagen: linkImagen, fecha: fecha, descripcion: descripcion, precio: precio, location: location, categoria: categoria});
    res.send('usuario creado con exito')
    console.log(eventoNuevo);
})

iniciar();
