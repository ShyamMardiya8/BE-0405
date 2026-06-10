const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Staff } = require("../Models/staff.model");
const ApiErrorHandler = require("../utility/ApiErrorHandler");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const header = req.headers["authorization"]
    if (!header) {
      throw new ApiErrorHandler('Authorization header is missing', 401)
    }
    const token = header.split(" ")[1];
    const secret = process.env.SECRET;
    if (!token) {
      console.error();
      throw new ApiErrorHandler("Token is missing", 401);
    }

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

    req.user = findUser;
    next();
  } catch (error) {
    throw new ApiErrorHandler(error.message, 500);
  }
};

module.exports = auth;
