//ORM Object Relational Mapping

const { Schema, model } = require('mongoose')

const ProductoraSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El campo Nombre es obligatorio'],
        minlength: 1
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    slogan: {
        type: String
    },
    descripcion: {
        type: String
    }
})

module.exports = model('Productora', ProductoraSchema)