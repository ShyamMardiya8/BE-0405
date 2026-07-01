import mongoose from "mongoose";

const visitingSettingSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    visitPurpose: [
      {
        id: { type: String, required: true },
        purpose: { type: String, required: true },
      },
    ],
    feedbackTypes: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    taskType: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const VisitingSetting =
  mongoose.models.VisitingSetting ||
  mongoose.model("VisitingSetting", visitingSettingSchema);
export default VisitingSetting;
