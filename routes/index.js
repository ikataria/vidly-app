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

const user = require('./user/routes')
router.use('/user', user)

module.exports = router