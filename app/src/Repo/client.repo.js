import { errMessage } from "../constant";
import Client from "../Models/client.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const clientRepo = {
  readClient: async () => {
    try {
      const readClient = await Client.find({});
      if (!readClient) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return readClient;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  addClient: async (clientData) => {
    try {
      const addClient = await Client.create(clientData);
      if (!addClient) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return addClient;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  updateClient: async (clientId, clientData) => {
    try {
      const updateClient = await Client.findByIdAndUpdate(clientId, clientData);
      if (!updateClient) {
        throw new ApiErrorHandler(errMessage.update, 500);
      }
      return updateClient;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  deleteClient: async (clientId) => {
    try {
      const deleteClient = await Client.findByIdAndDelete(clientId);
      if (!deleteClient) {
        throw new ApiErrorHandler(errMessage.delete, 404);
      }
      return deleteClient;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default clientRepo;
