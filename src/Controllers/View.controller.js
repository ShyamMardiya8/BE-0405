const viewService = require("../Service/view.service");
const ApiErrorHandler = require("../utility/ApiErrorHandler");
const asyncHandler = require("../utility/AsyncHandler");
const ResponseHandler = require("../utility/ResponseHandler");

const viewController = {
    fetchForm: asyncHandler(async (req, res) => {
        const formId = req.query.id;
        if (!formId) {
            throw new ApiErrorHandler('Form Id is missing', 400)
        }
        const fetchedForm = await viewService.fetchForm(formId);
        const response = new ResponseHandler("Form fetched successfully", 200, fetchedForm, true)

        return res.status(200).json(response)
    }),
    submitForm: asyncHandler(async (req, res) => {
        const formBody = req.body;
        const fetchedForm = await viewService.submitForm(formBody);
        const response = new ResponseHandler("Form fetched successfully", 200, fetchedForm, true)

        return res.status(200).json(response)
    })
}

module.exports = viewController

