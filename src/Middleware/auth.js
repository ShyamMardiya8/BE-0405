import jwt from "jsonwebtoken";
import { Staff } from "@/src/Models/staff.model";
import ApiErrorHandler from "@/src/utility/ApiErrorHandler";
import { dbConnections } from "@/src/db";

export const auth = async (req) => {
  await dbConnections();
  const header = req.headers.get("authorization");
  if (!header) {
    throw new ApiErrorHandler("Authorization header is missing", 401);
  }
  const token = header.split(" ")[1];
  const secret = process.env.SECRET;
  if (!token) {
    throw new ApiErrorHandler("Token is missing", 401);
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    if (!decodedToken) {
      throw new ApiErrorHandler("token expired", 403);
    }
    const creds = {
      email: decodedToken.email,
    };

    const findUser = await Staff.findOne(creds);
    if (!findUser) {
      throw new ApiErrorHandler("user does not exist", 404);
    }

    return findUser;
  } catch (error) {
    if (error instanceof ApiErrorHandler) {
      throw error;
    }
    throw new ApiErrorHandler(error.message, 500);
  }
};
export default auth;
