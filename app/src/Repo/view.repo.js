import { errMessage } from "../constant";
import Form from "../Models/form.model";
import SubmittedForms from "../Models/formView.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const viewRepo = {
  fetchForm: async (id) => {
    try {
      const fetchFormFromDB = await Form.findById(id);
      if (!fetchFormFromDB) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return fetchFormFromDB;
    } catch (error) {
      console.error(error, "viewRepo.fetchForm");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  submitForm: async (formBody) => {
    try {
      const fetchFormFromDB = await SubmittedForms.create(formBody);
      if (!fetchFormFromDB) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return fetchFormFromDB;
    } catch (error) {
      console.error(error, "viewRepo.submitForm");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default viewRepo;
