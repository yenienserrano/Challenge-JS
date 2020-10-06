const { response } = require('express')
const moment = require('moment');

const Operation = require('../model/operations')

const getOperations = async(req, res) =>{
    try {

        const operations = await Operation.find()

        operations.reverse()

        res.status(200).send(operations)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const getEgresado = async(req, res) =>{
    try {

        const operations = await Operation.find()

        const result = operations.reverse().filter(operation => operation.tipo == "Egreso")        

        var egresoTotal = result.reduce((sum, value) => (typeof value.monto == "number" ? sum + value.monto : sum), 0);        

        res.status(200).send({
            result,
            egresoTotal
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const getIngreso = async(req, res) =>{
    try {

        const operations = await Operation.find()

        const result = operations.reverse().filter(operation => operation.tipo === "Ingreso" )

        var ingresoTotal = result.reduce((sum, value) => (typeof value.monto == "number" ? sum + value.monto : sum), 0);

        res.status(200).send({
            result,
            ingresoTotal
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}


const saveOperation = async (req, res = response) => {

    const { monto, concepto, tipo, fecha } = req.body

    try {
        const operation = new Operation( req.body )

        operation.fecha = moment().format('ll'); 

        await operation.save()

        res.json({
            ok: true,
            operation
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const editOperation = async (req, res = response) => {

    const uid = req.params.id

    try {
        const operationEdit = await Operation.findById( uid )

        if( !operationEdit ){
            return res.status(404).json({
                ok:false,
                msg: "No existe la operacion"
            })
        }

        const { fecha, tipo, ...camp} =  req.body

        const updateOperation = await Operation.findByIdAndUpdate( uid, camp, { new: true })


        res.json({
            ok: true,
            updateOperation
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const deleteOperation = async (req, res = response ) => {

    const uid = req.params.id

    try {
        
        const operationEdit = await Operation.findById( uid )

        if( !operationEdit ){
            return res.status(404).json({
                ok:false,
                msg: "No existe la operacion"
            })
        }

        await Operation.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: "Operacion eliminada"
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

module.exports = {
    getOperations,
    saveOperation,
    editOperation,
    deleteOperation,
    getEgresado,
    getIngreso 
}