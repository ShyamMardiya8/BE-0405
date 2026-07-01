import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
}, { timestamps: true });

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);
export default Company;
