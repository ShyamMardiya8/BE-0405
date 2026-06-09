const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    fields: [{
        label: String,
        fieldType: String,
        required: true
    }]
})

const Form = mongoose.model('Form', formSchema)