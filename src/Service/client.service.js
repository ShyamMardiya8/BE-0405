const  clientRepo  = require("../Repo/client.repo");

const clientService = {
  readClient: async (params) => {
    try {
      const fetchedFromDB = await clientRepo.readClient();
      return fetchedFromDB;
    } catch (error) {
      console.error(error, "Error while reading client");
      throw new Error(error);
    }
  },
  createClient: async (clientBody) => {
    try {
      const createClientFromDB = await clientRepo.addClient(clientBody);
      return createClientFromDB
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  updateClient: async (clientId, clientBody) => {
    try {
      const createClientFromDB = await clientRepo.updateClient(
        clientId,
        clientBody,
      );
      return createClientFromDB;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  deleteClient: async (clientId) => {
    try {
        const deleteClientFromDB = await clientRepo.deleteClient(clientId);
        return deleteClientFromDB
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
  },
};
module.exports = clientService ;
