import clientRepo from "../Repo/client.repo";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const clientService = {
  readClient: async (params) => {
    try {
      const fetchedFromDB = await clientRepo.readClient();
      return fetchedFromDB;
    } catch (error) {
      console.error(error, "Error while reading client");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  createClient: async (clientBody) => {
    try {
      const createClientFromDB = await clientRepo.addClient(clientBody);
      return createClientFromDB;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
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
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  deleteClient: async (clientId) => {
    try {
        const deleteClientFromDB = await clientRepo.deleteClient(clientId);
        return deleteClientFromDB;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default clientService;
