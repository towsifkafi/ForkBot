const mongoose = require('mongoose') 

let Schema = new mongoose.Schema({
    Guild: String,
    Status: Array
})

module.exports = mongoose.model('nsfw-status', Schema)