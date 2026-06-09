const { staffRepo } = require("../Repo/staff.repo");

const staffService = {
  addEmployee: async (employeeData) => {
    try {
      const employee = await staffRepo.createEmployee(employeeData);
      return employee;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  readEmployee: async () => {
    try {
      const employeesData = await staffRepo.readEmployee();
      return employeesData
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
   updateEmployee: async (employeeId, employeeBodyData) => {
    try {
      const employeesData = await staffRepo.updateEmployee(employeeId, employeeBodyData);
      return employeesData
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  deleteEmployee: async (employeeId) => {
    try {
      const employeesData = await staffRepo.deleteEmployee(employeeId);
      return employeesData
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
};

module.exports = { staffService };
