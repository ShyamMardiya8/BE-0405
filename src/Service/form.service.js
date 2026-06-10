const formRepo = require("../Repo/form.repo");
const ApiErrorHandler = require("../utility/ApiErrorHandler");

const formService = {
  createForm: async (formBody) => {
    try {
      const fetchCreatedForm = await formRepo.createForm(formBody);
      return fetchCreatedForm;
    } catch (error) {
      console.error(error, 'formService.createForm');
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  readForm: async (params) => {
    try {
      const fetchFormData = await formRepo.readForm();
      return fetchFormData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  updateForm: async (formId, formBody) => {
    try {
      const fetchUpdatedFormData = await formRepo.updateForm(formId, formBody);
      return fetchUpdatedFormData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  deleteForm: async (formId) => {
    try {
      const fetchUpdatedFormData = await formRepo.deleteForm(formId);
      return fetchUpdatedFormData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
};

module.exports = formService;
