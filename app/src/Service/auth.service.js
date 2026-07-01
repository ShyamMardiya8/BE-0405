import { authRepo } from "../Repo/auth.repo";
import jwt from "jsonwebtoken";
import bct from "bcrypt";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const authService = {
  register: async (userBodyData) => {
    try {
      const saltedPassword = 10;
      const hashedPassword = await bct.hash(String(userBodyData.password), saltedPassword);
      delete userBodyData.password;
      const userBodyObj = {
        ...userBodyData,
        password: hashedPassword
      };
      const user = await authRepo.createUser(userBodyObj);
      return user;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  login: async (email, password) => {
    try {
      const user = await authRepo.findUserByEmailAndPassword(email, password);
      if (!user) {
        throw new ApiErrorHandler("Invalid email or password", 404);
      }
      const secretToken = process.env.SECRET;
      const token = await jwt.sign(
        { email, userId: user._id, companyId: user.companyId, role: user.role },
        secretToken,
        {
          expiresIn: "1h",
        },
      );
      const refreshToken = await jwt.sign(
        { email, userId: user._id, companyId: user.companyId, role: user.role },
        secretToken,
        {
          expiresIn: "10d",
        },
      );
      return {
        user,
        token,
        refreshToken,
      };
    } catch (error) {
      console.error(error, "authService.login");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};
