import { Staff } from "../Models/staff.model";
import bct from "bcrypt";
import ApiErrorHandler from "../utility/ApiErrorHandler";
import { errMessage } from "../constant";

export const authRepo = {
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
        throw new ApiErrorHandler("user doesn't exist", 404);
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};
