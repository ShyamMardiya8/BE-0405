const { Staff } = require("../Models/staff.model");

const staffRepo = {
  createEmployee: async (employeeData) => {
    try {
      const employee = await Staff.create(employeeData);
      return employee;
    } catch (error) {
      console.error(error, "staffRepo.createEmployee");
      throw new Error(error);
    }
  },
  readEmployee: async () => {
    try {
      const readEmployee = await Staff.find({}).select("-password");
      return readEmployee;
    } catch (error) {
      console.error(error, 'staffRepo.readEmployee')
      throw new Error("Error reading employee");
    }
  },
  updateEmployee: async (id, body) => {
    try {
      const updateEmployee = await Staff.updateOne(id, body)
      return updateEmployee
    } catch (error) {
      console.error(error, "staffRepo.updateEmployee");
      throw new Error("Error reading employee");
    }
  },
  deleteEmployee: async (id, body) => {
    try {
      const updateEmployee = await Staff.deleteOne(id)
      return updateEmployee
    } catch (error) {
      console.error(error, "staffRepo.updateEmployee");
      throw new Error("Error reading employee");
    }
  },
};

module.exports = { staffRepo };
