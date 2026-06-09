const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client
