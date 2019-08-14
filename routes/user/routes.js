const express = require('express')
const router = express.Router()

router.post('/registeruser', require('./regisUser'))

module.exports = router