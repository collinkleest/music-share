const mongoose = require('mongoose');

const userEntitySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    isVerified: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("USERS", userEntitySchema);