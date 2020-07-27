const mongoose = require('mongoose')

const message = new mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('message', message)