const express = require("express");

const staff = require("./Staff/staff.routes");
const auth = require('./Auth/auth.routes');
const client = require("./Client/client.routes");

const router = express.Router();
router.use('/auth', auth)
router.use('/staff', staff);
router.use('/client', client);


module.exports = router