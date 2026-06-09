const { staffService } = require("../Service/Staff.service");
const asyncHandler = require("../utility/AsyncHandler");

const staffController = {
  addEmployee: asyncHandler(async (req, res) => {
    const employeeData = req.body;
    // Call the service to add the employee
    const employee = await staffService.addEmployee(employeeData);
    return res
      .status(201)
      .json(
        new ResponseHandler("Employee added successfully", 200, employee, true),
      );
  }),
};
module.exports = { staffController };
