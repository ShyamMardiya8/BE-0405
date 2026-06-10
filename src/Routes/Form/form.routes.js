const express = require("express");
const {endpoints} = require("../../constant");
const formController = require("../../Controllers/Form.controller");
const {
  requestValidators,
} = require("../../Middleware/requestValidators.middleware");
const auth = require("../../Middleware/auth.middleware");
const form = express.Router();

form.get(endpoints.GET, auth, formController.readForm);
form.post(
  endpoints.POST,
  auth,
  requestValidators.form,
  formController.createForm,
);
form.put(
  endpoints.PUT,
  auth,
  requestValidators.form,
  formController.updateForm,
);
form.delete(endpoints.DELETE, auth, formController.deleteForm);

module.exports = form;
