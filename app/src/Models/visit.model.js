import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  time: {
    type: "string",
    required: true,
  },
  subject: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    enum: ["Pending", "Completed", "Canceled"],
    default: "Pending",
  },
});

export const Visit = mongoose.models.visit || mongoose.model("visit", visitSchema);
export default Visit;

