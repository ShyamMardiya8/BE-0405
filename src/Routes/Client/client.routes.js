const express = require('express');
const {endpoints} = require('../../constant');
const { requestValidators } = require('../../Middleware/requestValidators.middleware');
const {clientController} = require("../../Controllers/Client.controller")

const client = express.Router();

client.get(endpoints.GET, clientController.readClient);
client.post(endpoints.POST, requestValidators.client, clientController.createClient);
client.put(endpoints.PUT, requestValidators.client, clientController.updateClient);
client.delete(endpoints.DELETE, clientController.deleteClient);

module.exports = client