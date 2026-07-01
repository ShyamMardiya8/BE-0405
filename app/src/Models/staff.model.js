import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
  photo: {
    type: String,
    required: false,
    default: "",
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  additionalNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
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
  reportingHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    default: null,
  }, 
  locationTracking: {
    type: Boolean,
    required: true,
    default: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
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