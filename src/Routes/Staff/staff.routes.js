const express = require('express');
const { requestValidators } = require('../../Middleware/requestValidators.middleware');
const { staffController } = require('../../Controllers/staff.controller');
const {endpoints} = require('../../constant');
const auth = require('../../Middleware/auth.middleware');

const staff = express.Router();

staff.get(endpoints.GET, auth, staffController.readEmployee);
staff.post(endpoints.POST,auth, requestValidators.staff, staffController.addEmployee);
staff.put(endpoints.PUT,auth, requestValidators.staff, staffController.updateEmployee);
staff.delete(endpoints.DELETE,auth, staffController.deleteEmployee);

module.exports = staff