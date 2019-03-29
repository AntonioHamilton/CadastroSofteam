const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cpf: {
        type: Number,
        unique: true,
        required: true
    },
    nome: {
        type: String,
        required: true 
    },
    telefone: {
        type: Number
    },
    cep: {
        type: String
    },
    numero: {
        type: Number
    },
    complemento: {
        type: String
    } 
}) 

module.exports = mongoose.model('User', userSchema);