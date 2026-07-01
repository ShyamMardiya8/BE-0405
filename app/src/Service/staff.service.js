import { staffRepo } from "../Repo/staff.repo";
import ApiErrorHandler from "../utility/ApiErrorHandler";

export const staffService = {
  addEmployee: async (employeeData) => {
    try {
      const employee = await staffRepo.createEmployee(employeeData);
      return employee;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  readEmployee: async () => {
    try {
      const employeesData = await staffRepo.readEmployee();
      return employeesData;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
   readEmployeeByEmail: async (email) => {
    try {
      const employeesData = await staffRepo.readEmployeeByEmail(email);
      return employeesData;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },

  updateEmployee: async (employeeId, employeeBodyData) => {
    try {
      const employeesData = await staffRepo.updateEmployee(employeeId, employeeBodyData);
      return employeesData;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  },
  deleteEmployee: async (employeeId) => {
    try {
      const employeesData = await staffRepo.deleteEmployee(employeeId);
      return employeesData;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500);
    }
  }
};
