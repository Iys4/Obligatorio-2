const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    nombre: String,
    nivel: Number,
    clase: String
})

module.exports = mongoose.model("user", userSchema)