const { Schema } = require("zod");
const { staffValidatorSchema } = require("../utility/Validators");

const requestValidators = {
  staff: (req, res, next) => {
    const validation = staffValidatorSchema.safeParse(req.body);
    if (!validation.success) {
      throw new Error(validation.error.errors);
    }

    req.body = validation.data;
    next();
  },
  
};

module.exports = { requestValidators };
