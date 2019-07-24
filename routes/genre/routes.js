const express = require('express')
const router = express.Router()


const createGenre = require('./createGenre')
router.post('/createGenre', createGenre)

const getGenre = require('./getGenre')
router.get('/getGenre', getGenre)

const updateGenre = require('./updateGenre')
router.put('/updateGenre', updateGenre)

const deleteGenre = require('./deleteGenre')
router.put('/deleteGenre', deleteGenre)

module.exports = router