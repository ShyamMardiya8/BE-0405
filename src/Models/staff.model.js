const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [
    {
      startTime: String,
      endTime: String,
      location: Number,
      clientDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clients",
      },
    },
  ],
});

export const Staff = mongoose.model("Staff", staffSchema);
