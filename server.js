const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/config.json')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(config.connectionString, { useNewUrlParser: true }, (err, connection) => {
    if (err) {
        console.log('Connection to database failed,', err.message)
    } else {
        console.log('Connected to database successfully')
    }
})

const routes = require('./routes/index')
app.use('/api', routes)


app.listen(config.portNum)
console.log('listening on port 5000')