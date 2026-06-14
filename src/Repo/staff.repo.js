import { errMessage } from "../constant";
import { Staff } from "../Models/staff.model";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const staffRepo = {
  createEmployee: async (employeeData) => {
    try {
      const employee = await Staff.create(employeeData);
      if (!employee) {
        throw new ApiErrorHandler(errMessage.create, 500);
      }
      return employee;
    } catch (error) {
      console.error(error, "staffRepo.createEmployee");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  readEmployee: async () => {
    try {
      const readEmployee = await Staff.find({}).select("-password");
      if (!readEmployee) {
        throw new ApiErrorHandler(errMessage.get, 404);
      }
      return readEmployee;
    } catch (error) {
      console.error(error, 'staffRepo.readEmployee');
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  updateEmployee: async (id, body) => {
    try {
      const updateEmployee = await Staff.findByIdAndUpdate(id, body);
      if (!updateEmployee) {
        throw new ApiErrorHandler(errMessage.update, 500);
      }
      return updateEmployee;
    } catch (error) {
      console.error(error, "staffRepo.updateEmployee");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  deleteEmployee: async (id) => {
    try {
      const updateEmployee = await Staff.findByIdAndDelete(id);
      if (!updateEmployee) {
        throw new ApiErrorHandler(errMessage.delete, 500);
      }
      return updateEmployee;
    } catch (error) {
      console.error(error, "staffRepo.deleteEmployee");
      throw new ApiErrorHandler(error.message, 500);
    }
  },
};
