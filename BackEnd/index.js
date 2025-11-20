const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const evento = require("./Evento");
const usuario = require("./User");

const { randomInt } = require('crypto');
const cors = require('cors');
app.use(cors());

async function iniciar() {
    try {
        await mongoose.connect("mongodb+srv://Isma:Obligatorio2CarmenIsma@cluster0.agxgzbc.mongodb.net/"); 
        console.log("Conectado a la base de datos");

        app.listen(port, () => {
            console.log("Escuchando a puerto " + port);
        });
    }
    catch (error) {
        console.log("Error de conexion a la base de datos: " + error);
    }
}

app.use(express.json());

app.get('/eventos', async (req, res) => {
    const eventos = await evento.find();
    res.send(eventos);
});

app.delete("/eventos/:id", async (req, res) => {
    try {
        const params = req.params;
        console.log(params);
        await evento.findByIdAndDelete(params.id);
        res.send("Evento eliminado con exito" + params.id);
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).send('Error al eliminar el evento');
    }
});

app.post('/crear', async (req, res) => {
    try {
        const body = req.body;

        const nuevoEvento = new evento({
            creadorEvento: body.creadorEvento || [],
            nombreEvento: body.nombreEvento,
            linksImagenes: body.linksImagenes || [],
            fecha: body.fecha,
            descripcion: body.descripcion,
            precio: body.precio,
            location: body.location,
            categoria: body.categoria,
            menoresDeEdad: body.menoresDeEdad ?? false,
            techado: body.techado ?? false,
            presencial: body.presencial ?? true
        });

        await nuevoEvento.save();
        res.status(201).send('Evento creado con éxito');
        console.log('Nuevo evento:', nuevoEvento);
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).send('Error al crear el evento');
    }
});



app.put('/eventos/:id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body
        const creadorEvento = body.creadorEvento
        const nombreEvento = body.nombreEvento
        const linkImagen = body.linkImagen
        const fecha = body.fecha
        const descripcion = body.descripcion
        const precio = body.precio
        const location = body.location
        const categoria = body.categoria
        if (!creadorEvento || !nombreEvento || !linkImagen || !fecha || !descripcion || !precio || !location || !categoria) {
            return res.status(400).send('Faltan datos obligatorios');
        }
        console.log(params);
        console.log(body);
        await evento.findByIdAndUpdate(params.id, body);
        res.send("Evento actualizado con exito " + params.id);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).send('Error al actualizar el evento');
    }
});

/* Usuarios */

app.get('/usuarios', async (req, res) => {
    const usuarios = await usuario.find();
    res.send(usuarios);
});

app.delete("/usuarios/:id", async (req, res) => {
    try {
        const params = req.params;
        console.log(params);
        await usuario.findByIdAndDelete(params.id);
        res.send("Usuario eliminado con exito" + params.id);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error al eliminar el usuario');
    }
});

app.post('/crearUsuario', async (req, res) => {
    try {
        const body = req.body;

        if (!body.nombreUsuario || !body.contraseñaUsuario) {
            return res.status(400).send("Nombre y contraseña son obligatorios");
        }

        const existe = await usuario.findOne({ nombreUsuario: body.nombreUsuario.trim() });
        if (existe) {
            return res.status(409).send("Ese nombre de usuario ya está en uso");
        }

        const nuevoUsuario = new usuario({
            nombreUsuario: body.nombreUsuario,
            contraseñaUsuario: body.contraseñaUsuario,
            descripcionUsuario: body.descripcionUsuario || "",
            ubicacionUsuario: body.ubicacionUsuario || "",
            interesesUsuario: body.interesesUsuario || [],
            eventosUsuario: [],
            eventosSeguidos: []
        });

        await nuevoUsuario.save();
        res.status(201).send('Usuario creado con éxito');
        console.log('Nuevo usuario:', nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error al crear el usuario');
    }
});



app.put('/usuarios/:id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body
        const nombreUsuario = body.nombreUsuario
        const contraseñaUsuario = body.contraseñaUsuario
        const descripcionUsuario = body.descripcionUsuario
        const ubicacionUsuario = body.ubicacionUsuario
        const interesesUsuario = body.interesesUsuario
        const eventosUsuario = body.eventosUsuario || []
        const eventosSeguidos = body.eventosSeguidos || []
        if (!nombreUsuario || !contraseñaUsuario) {
            return res.status(400).send('Faltan datos obligatorios');
        }
        console.log(params);
        console.log(body);
        await usuario.findByIdAndUpdate(params.id, body);
        res.send("Usuario actualizado con exito " + params.id);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send('Error al actualizar el usuario');
    }
});



iniciar();
