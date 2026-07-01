import Company from "../Models/company.model";
import { Staff } from "../Models/staff.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";
import mongoose from "mongoose";
import BillingSetting from "../Models/billingSetting.model";
import VisitingSetting from "../Models/visitSetting.model";
import CustomerSetting from "../Models/customerSetting.model";
import SalesSettings from "../Models/salesSettings.model";

export const companyRepo = {
  onboardCompanyWithAdmin: async (companyData, adminUserData) => {
    try {
      // 1. Create Company
      const company = await Company.create(companyData);
      if (!company) {
        throw new ApiErrorHandler("Failed to create company record", 500);
      }

      const companyId = company._id;

      // 2. Initialize default linked setting models
      await BillingSetting.create({
        companyId,
        companyName: company.brandName,
        gstNumber: "",
        address: "",
      });

      await VisitingSetting.create({
        companyId,
        visitPurpose: [],
        feedbackTypes: [],
        taskType: [],
      });

      await CustomerSetting.create({
        companyId,
        phoneNumberSettings: {
          optionalSettings: true,
          contactsDublicate: false,
          multuipleContacts: true,
        },
        categories: [],
      });

      await SalesSettings.create({
        companyId,
        salesSettings: {},
      });

      // 3. Create Super Admin Staff user
      const adminStaff = await Staff.create({
        companyId,
        photo: adminUserData.adminPhoto,
        firstname: adminUserData.adminFirstname,
        lastname: adminUserData.adminLastname,
        email: adminUserData.adminEmail,
        mobileNumber: adminUserData.adminMobileNumber,
        additionalNumber: adminUserData.adminAdditionalNumber,
        password: adminUserData.hashedPassword,
        role: "Super Admin",
        reportingHead: null,
        locationTracking: true,
        active: true,
      });

      return {
        company,
        adminStaff,
      };
    } catch (error) {
      console.error("[companyRepo] Error during onboarding:", error);
      throw new ApiErrorHandler(
        error.message || "Failed to onboard company",
        500,
      );
    }
  },
  fetchCompany: async (companyId) => {
    try {
      const company = await Company.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(companyId),
          },
        },
        {
          $lookup: {
            from: "billingsettings",
            localField: "_id",
            foreignField: "companyId",
            as: "billingSettingArray",
          },
        },
        {
          $addFields: {
            billingSetting: { $first: "$billingSettingArray" },
          },
        },
        {
          $lookup: {
            from: "customersettings",
            localField: "_id",
            foreignField: "companyId",
            as: "customerSettingArray",
          },
        },
        {
          $addFields: {
            customerSetting: { $first: "$customerSettingArray" },
          },
        },
        {
          $lookup: {
            from: "salessettings",
            localField: "_id",
            foreignField: "companyId",
            as: "salesSettingArray",
          },
        },
        {
          $addFields: {
            salesSetting: { $first: "$salesSettingArray" },
          },
        },
        {
          $lookup: {
            from: "visitingsettings",
            localField: "_id",
            foreignField: "companyId",
            as: "visitSettingArray",
          },
        },
        {
          $addFields: {
            visitSetting: { $first: "$visitSettingArray" },
          },
        },
      ]);
      return company && company.length > 0 ? company[0] : null;
    } catch (error) {
      console.error("[companyRepo] Error during fetching company:", error);
      throw new ApiErrorHandler(
        error.message || "Failed to fetch company",
        500,
      );
    }
  },
};
