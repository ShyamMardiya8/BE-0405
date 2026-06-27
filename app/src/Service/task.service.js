import taskRepo from "../Repo/task.repo";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const taskService = {
  createTask: async (taskData) => {
    try {
      const record = await taskRepo.createTask(taskData);
      return record;
    } catch (error) {
      console.error(error, "Error while creating task");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  readTask: async (query = {}) => {
    try {
      const records = await taskRepo.readTask(query);
      return records;
    } catch (error) {
      console.error(error, "Error while reading task");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateTask: async (id, body) => {
    try {
      const record = await taskRepo.updateTask(id, body);
      return record;
    } catch (error) {
      console.error(error, "Error while updating task");
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  deleteTask: async (id) => {
    try {
      const record = await taskRepo.deleteTask(id);
      return record;
    } catch (error) {
      console.error(error, "Error while deleting task");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};

export default taskService;
