const { errMessage } = require("../constant");
const Form = require("../Models/form.model");
const SubmittedForms = require("../Models/formView.model");
const ApiErrorHandler = require("../utility/ApiErrorHandler");
const asyncHandler = require("../utility/AsyncHandler");

const viewRepo = {
  fetchForm: async (id) => {
    try {
      const fetchFormFromDB = await Form.findById(id);
      if (!fetchFormFromDB) {
         throw new ApiErrorHandler(errMessage.get, 404)
      }
      return fetchFormFromDB;
    } catch (error) {
      console.error(error, "viewRepo.fetchForm");
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  submitForm: async (formBody) => {
    try {
      const fetchFormFromDB = await SubmittedForms.create(formBody);
      if (!fetchFormFromDB) {
        throw new ApiErrorHandler(errMessage.create, 500)
      }
      return fetchFormFromDB;
    } catch (error) {
      console.error(error, "viewRepo.submitForm");
      throw new ApiErrorHandler(error.message, 500);
    }
  }
};

module.exports = viewRepo;
