const express = require("express");
const {endpoints} = require("../../constant");
const formController = require("../../Controllers/Form.controller");
const {
  requestValidators,
} = require("../../Middleware/requestValidators.middleware");
const auth = require("../../Middleware/auth.middleware");
const viewController = require("../../Controllers/View.controller");
const view = express.Router();

view.get(endpoints.GET, auth, viewController.fetchForm);
view.post(
  endpoints.POST,
  auth,
  viewController.submitForm,
);
// view.put(
//   endpoints.PUT,
//   auth,
//   requestValidators.form,
//   formController.updateForm,
// );
// view.delete(endpoints.DELETE, auth, formController.deleteForm);

module.exports = view;
