import { errMessage } from "../constant";
import Task from "../Models/task.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const taskRepo = {
  createTask: async (taskData) => {
    try {
      const task = await Task.create(taskData);
      if (!task) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return task;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "taskRepo.createTask");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readTask: async (query = {}) => {
    try {
      const readTask = await Task.find(query);
      if (!readTask) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return readTask;
    } catch (error) {
      console.error(error, "taskRepo.readTask");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateTask: async (queryOrId, body) => {
    try {
      const filter =
        typeof queryOrId === "string" ? { _id: queryOrId } : queryOrId;
      const updateTask = await Task.findOneAndUpdate(filter, body, {
        new: true,
      });
      if (!updateTask) {
        throw new ApiErrorHandler("Task record not found", 404);
      }
      return updateTask;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      console.error(error, "taskRepo.updateTask");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteTask: async (id) => {
    try {
      const deleteTask = await Task.findByIdAndDelete(id);
      if (!deleteTask) {
        throw new ApiErrorHandler(errMessage.delete, 500);
      }
      return deleteTask;
    } catch (error) {
      console.error(error, "taskRepo.deleteTask");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default taskRepo;
