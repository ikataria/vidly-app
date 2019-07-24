const express = require('express')
const router = express.Router()


const genre = require('./genre/routes')
router.use('/genre', genre)

const customer = require('./customer/routes')
router.use('/customer', customer)

const movie = require('./movie/routes')
router.use('/movie', movie)

const rent = require('./rental/routes')
router.use('/rental', rent)

module.exports = router