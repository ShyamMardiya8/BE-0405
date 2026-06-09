const  Client  = require("../Models/client.model")

const clientRepo = {
    readClient: async () => {
        try {
            const readClient = await Client.find({});
            return readClient
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    addClient: async (clientData) => {
        try {
            debugger
            const readClient = await Client.create(clientData);
            return readClient
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    updateClient: async (clientId, clientData) => {
        try {
            const updateClient = await Client.updateOne(clientId, clientData);
            return updateClient
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    },
    deleteClient: async (clientId) => {
        try {
            const deleteClient = await Client.deleteOne(clientId);
            return deleteClient
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}

module.exports = clientRepo 