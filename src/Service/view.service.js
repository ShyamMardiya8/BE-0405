const viewRepo = require("../Repo/view.repo");
const ApiErrorHandler = require("../utility/ApiErrorHandler");

const viewService = {
  fetchForm: async (id) => {
    try {
      const fetchForm = await viewRepo.fetchForm(id);
      return fetchForm;
    } catch (error) {
      console.error(error, "viewService.fetchForm");
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  submitForm: async (formBody) => {
    try {
      const submitForm = await viewRepo.submitForm(formBody)
      return submitForm
    } catch (error) {
      console.error(error, "viewService.fetchForm");
      throw new ApiErrorHandler(error.message, 500)
    }
  }
};

module.exports = viewService;
