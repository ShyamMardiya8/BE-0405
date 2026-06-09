const staffRepo = {
  createEmployee: async (employeeData) => {
    try {
      const employee = await Staff.create(employeeData);
      return employee;
    } catch (error) {
      console.error(error, "staffRepo.createEmployee");
    }
  },
};

module.exports = { staffRepo };
