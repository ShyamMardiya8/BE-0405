const mongoose = require("mongoose");

const formViewSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    responses: mongoose.Schema.Types.Mixed
})

const formView = mongoose.model('Form', formViewSchema)