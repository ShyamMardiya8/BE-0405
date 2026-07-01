import mongoose from "mongoose";

const salesSettingsSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  salesSettings: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, { timestamps: true });

const SalesSettings = mongoose.models.SalesSettings || mongoose.model("SalesSettings", salesSettingsSchema);
export default SalesSettings;
