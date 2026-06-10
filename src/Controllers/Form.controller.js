const formService = require("../Service/form.service");
const asyncHandler = require("../utility/AsyncHandler");
const ResponseHandler = require("../utility/ResponseHandler");

const formController = {
  createForm: asyncHandler(async (req, res) => {
    const formBody = req.body;
    const createdForm = await formService.createForm(formBody);
    const response = new ResponseHandler(
      "Form Created Successfully",
      200,
      createdForm,
      true,
    );
    res.status(200).json(response);
  }),
  readForm: asyncHandler(async (req, res) => {
    const fetchedFormData = await formService.readForm();
    const response = new ResponseHandler(
      "Fetched From data successfully",
      200,
      fetchedFormData,
      true,
    );
    return res.status(200).json(response);
  }),
  updateForm: asyncHandler(async (req, res) => {
    const id = req.query.id;
    const formBody = req.body;
    const updatedForm = await formService.updateForm(id, formBody);
    const response = new ResponseHandler(
      "Form updated Successfully",
      200,
      [],
      true,
    );
    return res.status(200).json(response);
  }),
  deleteForm: asyncHandler(async (req, res) => {
    const formId = req.query.id;
    const deletedFormData = await formService.deleteForm(formId);
    const response = new ResponseHandler(
      "Form Deleted Successfully",
      200,
      [],
      true,
    );
    return res.status(200).json(response);
  }),
};

module.exports = formController