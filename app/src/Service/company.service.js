import { companyRepo } from "../Repo/company.repo";
import bct from "bcrypt";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const companyService = {
  onboard: async (onboardData) => {
    try {
      const {
        brandName,
        phoneNumber,
        logo,
        email,
        website,
        adminPhoto,
        adminFirstname,
        adminLastname,
        adminMobileNumber,
        adminAdditionalNumber,
        adminEmail,
        adminPassword,
      } = onboardData;

      const saltRounds = 10;
      const hashedPassword = await bct.hash(String(adminPassword), saltRounds);

      const companyData = {
        brandName,
        phoneNumber,
        logo,
        email,
        website,
      };

      const adminUserData = {
        adminPhoto,
        adminFirstname,
        adminLastname,
        adminEmail,
        adminMobileNumber,
        adminAdditionalNumber,
        hashedPassword,
      };

      const result = await companyRepo.onboardCompanyWithAdmin(
        companyData,
        adminUserData,
      );
      return result;
    } catch (error) {
      console.error("[companyService] Error in onboard:", error);
      throw new ApiErrorHandler(error.message || "Onboarding failed", 500);
    }
  },
  getCompanyData: async (companyId) => {
    try {
      const result = await companyRepo.fetchCompany(companyId);
      return result;
    } catch (error) {
      console.error("[companyService] Error in getCompanyData:", error);
      throw new ApiErrorHandler(error.message || "Failed to fetch company data", 500);
    }
  },
};
