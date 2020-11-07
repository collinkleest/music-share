const mongoose = require('mongoose');

const userEntitySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("USERS", userEntitySchema);