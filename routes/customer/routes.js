const express = require('express')
const router = express.Router()

router.post('/addCustomer', require('./addCustomer'))

module.exports = router