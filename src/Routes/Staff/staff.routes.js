const express = require('express');
const staff = require('../../constant');
const { requestValidators } = require('../../Middleware/requestValidators.middleware');
const { staffController } = require('../../Controllers/staff.controller');

const app = express.Router();

app.get(staff.GET, requestValidators.staff, staffController.addEmployee)
