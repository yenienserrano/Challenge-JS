/* /api/operations */

const { Router } = require('express')
const { getOperations, saveOperation, editOperation, deleteOperation, getEgresado, getIngreso } = require('../controllers/operations')

const router = Router()


router.get('/', getOperations)
router.get('/egreso', getEgresado)
router.get('/ingreso', getIngreso)
router.post('/', saveOperation)
router.put('/:id', editOperation)
router.delete('/:id', deleteOperation)




module.exports = router