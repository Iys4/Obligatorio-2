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
        const rawId = req.params.id;
        const idReal = rawId.trim();
        console.log(params);
        await evento.findByIdAndDelete(idReal);
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
            creadorEvento: [body.creadorEvento], 
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

        const eventoGuardado = await nuevoEvento.save();
        console.log('Evento creado:', eventoGuardado);

        const usuarioCreador = await usuario.findOne({ nombreUsuario: body.creadorEvento });
        if (usuarioCreador) {
            usuarioCreador.eventosUsuario.push(eventoGuardado._id); 
            await usuarioCreador.save();
            console.log(`Evento agregado al usuario: ${usuarioCreador.nombreUsuario}`);
        } else {
            console.log("Usuario no encontrado");
        }

        res.status(201).send('Evento creado y asignado al usuario');

    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).send('Error al crear el evento');
    }
});




app.put('/eventos/:id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        const creadorEvento = body.creadorEvento;
        const nombreEvento = body.nombreEvento;
        const linksImagenes = body.linksImagenes;
        const fecha = body.fecha;
        const descripcion = body.descripcion;
        const precio = body.precio;
        const location = body.location;
        const categoria = body.categoria;

        if (!creadorEvento || !nombreEvento || !linksImagenes || !fecha || !descripcion || !precio || !location || !categoria) {
            return res.status(400).send('Faltan datos obligatorios');
        }

        console.log(params);
        console.log(body);
        idReal = params.id.trim();
        console.log("ID REAL: " + idReal);
        await evento.findByIdAndUpdate(idReal, body);

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
            interesesUsuario: body.interesesUsuario || "",
            eventosUsuario: [],
            imagenPerfil: body.imagenPerfil ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        });

        await nuevoUsuario.save();
        res.status(201).send('Usuario creado con éxito');
        console.log('Nuevo usuario:', nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send('Error al crear el usuario');
    }
});

app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuarioEncontrado = await usuario.findById(req.params.id);
        if (!usuarioEncontrado) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(usuarioEncontrado);
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        res.status(500).send("Error en el servidor");
    }
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

app.put('/usuarios/:id', async (req, res) => {
    try {
        const params = req.params;
        const body = req.body

        console.log(params);
        console.log(body);

        idReal = params.id;
        console.log("ID REAL: " + idReal);
        await usuario.findByIdAndUpdate(idReal, body);

        res.send("Usuario actualizado con exito " + params.id);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send('Error al actualizar el usuario');
    }
});

iniciar();
