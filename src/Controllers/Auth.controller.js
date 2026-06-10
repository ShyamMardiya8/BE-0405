const { authService } = require("../Service/auth.service");
const asyncHandler = require("../utility/AsyncHandler");
const ResponseHandler = require("../utility/ResponseHandler");

const authController = {
  register: asyncHandler(async (req, res) => {
    const userBodyData = req.body;
    const user = await authService.register(userBodyData);
    return res
      .status(201)
      .json(new ResponseHandler("User register successfully", 200, user, true));
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const response = {
      user: user.user,
      token: user.token,
      refreshToken: user.refreshToken,
    };
    return res
      .status(200)
      .json(
        new ResponseHandler("User login successfully", 200, response, true),
      );
  }),
};
module.exports = { authController };
