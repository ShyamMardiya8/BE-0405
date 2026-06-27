import visitRepo from "../Repo/visit.repo";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const visitService = {
  createVisit: async (visitData) => {
    try {
      const record = await visitRepo.createVisit(visitData);
      return record;
    } catch (error) {
      console.error(error, "Error while creating visit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readVisit: async (query = {}) => {
    try {
      const records = await visitRepo.readVisit(query);
      return records;
    } catch (error) {
      console.error(error, "Error while reading visit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateVisit: async (id, body) => {
    try {
      const record = await visitRepo.updateVisit(id, body);
      return record;
    } catch (error) {
      console.error(error, "Error while updating visit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteVisit: async (id) => {
    try {
      const record = await visitRepo.deleteVisit(id);
      return record;
    } catch (error) {
      console.error(error, "Error while deleting visit");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default visitService;
