import mongoose from "mongoose";

const { Schema } = mongoose;

const billingSettingSchema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    gstNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const BillingSetting =
  mongoose.models.BillingSetting ||
  mongoose.model("BillingSetting", billingSettingSchema);

export default BillingSetting;
