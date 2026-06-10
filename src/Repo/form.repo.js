const { errMessage } = require("../constant");
const Form = require("../Models/form.model");
const ApiErrorHandler = require("../utility/ApiErrorHandler");

const formRepo = {
  createForm: async (formBody) => {
    try {
      const createdFormFromDB = await Form.create(formBody);
      if (!createdFormFromDB) {
       throw new ApiErrorHandler(errMessage.create, 500)
      }
      return createdFormFromDB;
    } catch (error) {
      console.error(error, "formRepo.createForm");
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  readForm: async (params) => {
    try {
      const fetchedFormDataFromDB = await Form.find({});
      if (!fetchedFormDataFromDB) {
         throw new ApiErrorHandler(errMessage.read, 404)
      }
      return fetchedFormDataFromDB;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  updateForm: async (formId, formBody) => {
    try {
      const fetchedFormDataFromDB = await Form.findByIdAndUpdate(formId, formBody);
      if (!fetchedFormDataFromDB) {
         throw new ApiErrorHandler(errMessage.update, 404)
      }
      return fetchedFormDataFromDB;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  deleteForm: async (formId) => {
    try {
      const fetchDataFromDB = await Form.findByIdAndDelete(formId);
      if (!fetchDataFromDB) {
        throw new ApiErrorHandler(errMessage.delete, 404)
      }
      return fetchDataFromDB;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
};

module.exports = formRepo;
