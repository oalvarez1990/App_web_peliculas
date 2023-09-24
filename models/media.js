//ORM Object Relational Mapping

const { Schema, model } = require('mongoose')
const director = require('./director')

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'Serial requerido'],
        unique: [true, 'Media ya exixte']
    },
    titulo: {
        type: String,
        required: [true,'Titulo requerido'],
    },
    sinopsis: {
        type: String,
    },
    url: {
        type: String,
    },
    imagen: {
        type: String
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    anoEstreno: {
        type: Date,
        default: new Date()
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
})

module.exports = model('Media', MediaSchema)