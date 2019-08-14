const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        // unique: true,
        minlength: 10,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    },
    internalStatus: {
        type: Number,
        default: 0
    },
    createdAt: Date,
    SGID: String
})

customer = mongoose.model('customer', customerSchema)

exports.customer = customer;
exports.customerSchema = customerSchema