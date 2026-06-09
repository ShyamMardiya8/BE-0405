const { Schema } = require("zod");
const { staffValidatorSchema, clientValidationSchema, authValidation } = require("../utility/Validators");

const requestValidators = {
  auth: (req, res, next) => {
    const validation = authValidation.safeParse(req.body);
   
    if (!validation.success) {
      const errors = JSON.parse(validation.error.message);
      const response = errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      const error = new Error("validation error")
      error.statusCode = 400;
      error.errors = errors;
      throw error
    }

    req.body = validation.data;
    next();
  },
  staff: (req, res, next) => {
    const validation = staffValidatorSchema.safeParse(req.body);
    if (!validation.success) {
      const errors = JSON.parse(validation.error.message);
      const response = errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      const error = new Error("validation error")
      error.statusCode = 400;
      error.errors = errors;
      throw error
    }

    req.body = validation.data;
    next();
  },
  client: (req, res, next) => {
    const validation = clientValidationSchema.safeParse(req.body);
    if (!validation.success) {
      const errors = JSON.parse(validation.error.message);
      const response = errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      const error = new Error("validation error")
      error.statusCode = 400;
      error.errors = errors;
      throw error
    }
    req.body = validation.data;
    next();
  },
};

module.exports = { requestValidators };
