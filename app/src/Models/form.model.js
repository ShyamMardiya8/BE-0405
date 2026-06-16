import mongoose from "mongoose";

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
  }]
});

const Form = mongoose.models.Form || mongoose.model('Form', formSchema);

export default Form;