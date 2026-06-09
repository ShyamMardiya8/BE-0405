const { staffRepo } = require("../Repo/staff.repo");

const staffService = {
  addEmployee: async (employeeData) => {
    try {
      const employee = await staffRepo.createEmployee(employeeData);
      return employee;
    } catch (error) {
      console.error(error);
      throw new Error("Error adding employee");
    }
  },
};

module.exports = { staffService };
