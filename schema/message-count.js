const mongoose = require('mongoose')

const messageCountSchema = mongoose.Schema({
    // user id
    _id: {
        type: String,
        required: true,
    },

    //message count
    messageCount: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('message-counts', messageCountSchema)