const { Staff } = require("../Models/staff.model");
const bct = require("bcrypt");
const ApiErrorHandler = require("../utility/ApiErrorHandler");
const { errMessage } = require("../constant");

const authRepo = {
  createUser: async (userBodyData) => {
    try {
      const user = await Staff.create(userBodyData);
      if (!user) {
      throw new ApiErrorHandler(errMessage.create, 404);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  findUserByEmailAndPassword: async (email, password) => {
    try {
      const user = await Staff.findOne({ email });
      if (!user) {
         throw new ApiErrorHandler(errMessage.get, 404);
      }
      const isMatch = await bct.compare(String(password), String(user.password));
      if (!isMatch) {
        throw new ApiErrorHandler("use doesn't exist", 404)
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

module.exports = { authRepo };
