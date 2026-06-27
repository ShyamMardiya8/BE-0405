import { errMessage } from "../constant";
import Visit from "../Models/visit.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const visitRepo = {
  createVisit: async (visitData) => {
    try {
      const visit = await Visit.create(visitData);
      if (!visit) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return visit;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "visitRepo.createVisit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readVisit: async (query = {}) => {
    try {
      const readVisit = await Visit.find(query);
      if (!readVisit) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return readVisit;
    } catch (error) {
      console.error(error, "visitRepo.readVisit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateVisit: async (queryOrId, body) => {
    try {
      const filter =
        typeof queryOrId === "string" ? { _id: queryOrId } : queryOrId;
      const updateVisit = await Visit.findOneAndUpdate(filter, body, {
        new: true,
      });
      if (!updateVisit) {
        throw new ApiErrorHandler("Visit record not found", 404);
      }
      return updateVisit;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "visitRepo.updateVisit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteVisit: async (id) => {
    try {
      const deleteVisit = await Visit.findByIdAndDelete(id);
      if (!deleteVisit) {
        throw new ApiErrorHandler(errMessage.delete, 500);
      }
      return deleteVisit;
    } catch (error) {
      console.error(error, "visitRepo.deleteVisit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default visitRepo;
