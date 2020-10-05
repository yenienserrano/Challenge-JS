const { Schema, model } = require('mongoose')


const OperationSchema = Schema({
    concepto: {
        type: String,
        required: true,
    },
    monto: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String        
    },
    tipo: {
        type: String,
        required: true,
    }    
})

module.exports = model( 'Operation', OperationSchema )