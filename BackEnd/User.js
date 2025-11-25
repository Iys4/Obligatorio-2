const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: String,
    contraseñaUsuario: String,
    descripcionUsuario: String,
    ubicacionUsuario: String,
    interesesUsuario: String,
    eventosUsuario: Array,
    imagenPerfil: {
    type: String,
    default: "img/blankprofile.webp"
}
});

module.exports = mongoose.model("usuario", usuarioSchema)