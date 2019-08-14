const express = require('express')
const mongoose = require('mongoose')
    // const Fawn = require('fawn')
const bodyParser = require('body-parser')
const config = require('./config/config.json')
const app = express()
const helmet = require('helmet')
const compression = require('compression')

// Fawn.init(mongoose)

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

app.use(function(err, req, res, next) {
    res.status(500).json({
        success: false,
        msg: 'Something went wrong, please try again later.',
        err: "DB_ERR_2"
    })
})

app.use(helmet())
app.use(compression())

app.listen(config.portNum)
console.log('listening on port 5000')