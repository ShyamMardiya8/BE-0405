const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Staff } = require("../Models/staff.model");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const secret = process.env.SECRET;
    if (!token) {
      console.error();
      throw new Error("Token is missing");
    }

    const decodedPassword = jwt.verify(token, secret);
    if (!decodedPassword) {
      throw new Error("token expired");
    }
    const creds = {
      email: decodedPassword.email,
      password: decodedPassword.password,
    };

    const findUser = await Staff.findOne(creds);
    if (!findUser) {
      throw new Error("user does not exist");
    }

    req.user = findUser;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = auth;
