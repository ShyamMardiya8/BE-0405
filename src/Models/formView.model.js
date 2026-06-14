import mongoose from "mongoose";

const formViewSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form'
  },
  responses: mongoose.Schema.Types.Mixed
});

const SubmittedForms = mongoose.models.SubmittedForms || mongoose.model('SubmittedForms', formViewSchema);

export default SubmittedForms;