import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "On Leave"],
      default: "Present",
    },
    checkIn: {
      time: {
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
    },
    checkOut: {
      time: {
        type: String,
      },
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export { Attendance };
export default Attendance;
