const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    creadorEvento: Array,
    nombreEvento: String,
    linkImagen: Array,
    fecha: Date,
    descripcion: String,
    precio: Number,
    location: String,
    categoria: String,
    menoresDeEdad: Boolean,
    techado: Boolean,
    presencial: Boolean
});

module.exports = mongoose.model("evento", userSchema)