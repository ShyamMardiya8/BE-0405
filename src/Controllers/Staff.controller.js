const { staffService } = require("../Service/Staff.service");
const asyncHandler = require("../utility/AsyncHandler");
const ResponseHandler = require("../utility/ResponseHandler");

const staffController = {
  readEmployee: asyncHandler(async (req, res) => {
    const fetchedUserData = await staffService.readEmployee();
    const response =  new ResponseHandler("Fetched Successfully", 200, fetchedUserData, true)
    return res
      .status(200)
      .json(response);
  }),
  addEmployee: asyncHandler(async (req, res) => {
    const employeeData = req.body;
    // Call the service to add the employee
    const employee = await staffService.addEmployee(employeeData);
    const response =  new ResponseHandler("Created successfully", 200, employee, true)
    return res
      .status(201)
      .json(response);
  }),

  updateEmployee: asyncHandler(async (req, res) => {
    const employeeId = req.query.id;
    const employeeDataBody = req.body;
    const updatedExistingEmployee = await staffService.updateEmployee(
      employeeId,
      employeeDataBody,
    );
    const response =  new ResponseHandler(
          "Updated Successfully",
          200,
          updatedExistingEmployee,
          true,
        )
    return res
      .status(200)
      .json(response);
  }),

  deleteEmployee: asyncHandler(async (req, res) => {
    const employeeId = req.query.id;
    const updatedExistingEmployee = await staffService.deleteEmployee(
      employeeId,
    );
    const response = new ResponseHandler(
      "Delete Successfully",
      200,
      updatedExistingEmployee,
      true,
    );

    return res.status(200).json(response);
  }),
};
module.exports = { staffController };
