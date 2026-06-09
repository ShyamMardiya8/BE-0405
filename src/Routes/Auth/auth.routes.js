const express = require("express");
const { authController } = require("../../Controllers/Auth.controller");
const { requestValidators } = require("../../Middleware/requestValidators.middleware.js");

const auth = express.Router();

auth.post("/register", requestValidators.auth, authController.register);
auth.post("/login", authController.login);

module.exports = auth