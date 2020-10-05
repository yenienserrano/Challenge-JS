require('dotenv').config()

const express = require('express')
const { dbConnection } = require('./database/config')
const app = express()
const cors = require('cors')



app.use(cors())
app.use(express.json())

dbConnection()

app.use('/api/operations', require('./routes/operations'))


app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto ', process.env.PORT))

