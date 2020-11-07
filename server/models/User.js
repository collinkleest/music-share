const mongoose = require('mongoose');

const userEntitySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

modules.exports = mongoose.model("USERS", userEntitySchema);