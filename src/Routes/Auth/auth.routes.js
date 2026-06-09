const express = require("express");
const jwt = require("jsonwebtoken");
const { authController } = require("../../Controllers/Auth.controller");

const app = express.Router();

app.get("/register", authController.register);
app.get("/login", authController.login);
