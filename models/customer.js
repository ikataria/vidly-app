const mongoose = require('mongoose')

module.exports = mongoose.model('customer', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    internalStatus: {
        type: Number,
        default: 0
    }
}))