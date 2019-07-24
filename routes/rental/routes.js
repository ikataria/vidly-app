const express = require('express')
const router = express.Router()

router.post('/rent', require('./createRent'))
router.get('/getRentals', require('./getRent'))

module.exports = router