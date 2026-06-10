const mongoose = require("mongoose");

const formViewSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    responses: mongoose.Schema.Types.Mixed
})

const SubmittedForms = mongoose.model('SubmittedForms', formViewSchema);

module.exports = SubmittedForms