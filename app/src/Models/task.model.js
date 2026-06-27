import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
  createdBy: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
    required: true,
  },
});

export const Task = mongoose.models.task || mongoose.model("task", taskSchema);
export default Task;

