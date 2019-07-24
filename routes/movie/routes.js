const express = require('express')
const router = express.Router()

router.post('/addMovie', require('./addMovie'))

module.exports = router