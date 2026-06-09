const clientService = require("../Service/client.service");
const asyncHandler = require("../utility/AsyncHandler");
const ResponseHandler = require("../utility/ResponseHandler");
const clientController = {
    readClient: asyncHandler(async (req, res) => {
        const fetchedClientData = await clientService.readClient();
        const response = new ResponseHandler("Fetched Successfully",200, fetchedClientData, true )

        return res.status(200).json(response)
    }),
    createClient: asyncHandler(async (req, res) => {
        const body = req.body;
        const fetchedClientData = await clientService.createClient(body);
        const response = new ResponseHandler("Created Successfully",200,fetchedClientData, true )

        return res.status(200).json(response)
    }),
    updateClient: asyncHandler(async (req, res) => {
        const clientId = req.params.id;
        const clientBody = req.body;
        const fetchedClientData = await clientService.updateClient(clientId, clientBody);
        const response = new ResponseHandler("Updated Successfully", 200, fetchedClientData, true)
        
        return res.status(200).json(response)
    }),
    deleteClient: asyncHandler(async (req, res) => {
        const clientId = req.params.id
        const fetchedClientData = await clientService.deleteClient(clientId);
        const response = new ResponseHandler("Deleted Successfully",200,fetchedClientData, true )

        return res.status(200).json(response)
    })
}

module.exports = { clientController }