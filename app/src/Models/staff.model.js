import mongoose from "mongoose";

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
        ref: "Client",
      },
    },
  ],
  location: [
    {
      date: {
        type: String,
        required: true,
      },
      timeline: [
        {
          time: {
            type: String,
            required: true,
          },
          activity: {
            type: String,
            required: true,
          },
          lat: {
            type: Number,
            required: true,
          },
          lng: {
            type: Number,
            required: true,
          },
          clientName: {
            type: String,
          },
          duration: {
            type: String,
          },
        },
      ],
    },
  ],
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);

export { Staff };