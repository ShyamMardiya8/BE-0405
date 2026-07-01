import mongoose from "mongoose";

const customerSettingSchema = new mongoose.Schema(
  {
    companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
    phoneNumberSettings: {
      optionalSettings: { type: Boolean, default: false },
      contactsDublicate: { type: Boolean, default: false },
      multuipleContacts: { type: Boolean, default: false },
    },
    categories: [
      {
        id: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const CustomerSetting =
  mongoose.models.CustomerSetting ||
  mongoose.model("CustomerSetting", customerSettingSchema);
export default CustomerSetting;
