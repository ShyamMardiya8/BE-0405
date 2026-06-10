const { staffRepo } = require("../Repo/staff.repo");
const ApiErrorHandler = require("../utility/ApiErrorHandler");

const staffService = {
  addEmployee: async (employeeData) => {
    try {
      const employee = await staffRepo.createEmployee(employeeData);
      return employee;
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  readEmployee: async () => {
    try {
      const employeesData = await staffRepo.readEmployee();
      return employeesData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
   updateEmployee: async (employeeId, employeeBodyData) => {
    try {
      const employeesData = await staffRepo.updateEmployee(employeeId, employeeBodyData);
      return employeesData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  },
  deleteEmployee: async (employeeId) => {
    try {
      const employeesData = await staffRepo.deleteEmployee(employeeId);
      return employeesData
    } catch (error) {
      console.error(error);
      throw new ApiErrorHandler(error.message, 500)
    }
  }
};

module.exports = { staffService };
