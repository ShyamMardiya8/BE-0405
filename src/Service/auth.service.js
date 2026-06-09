const { authRepo } = require("../Repo/auth.repo");
const jwt = require("jsonwebtoken");
const bct = require("bcrypt")

const authService = {
  register: async (userBodyData) => {
    try {
      const saltedPassword = 10;
      const hashedPassword = await bct.hash(String(userBodyData.password), saltedPassword)
      delete userBodyData.password
      const userBodyObj = {
        ...userBodyData,
        password: hashedPassword
      }
      const user = await authRepo.createUser(userBodyObj);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  login: async (email, password, saltedPassword) => {
    try {
      const isMatch = await bct.compare(String(password), String(saltedPassword))
      const user = await authRepo.findUserByEmailAndPassword(email, password);
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const secretToken = process.env.SECRET
      const token = await jwt.sign(
        { email, password },secretToken,
        {
          expiresIn: "1h",
        },
      );
      const refreshToken = await jwt.sign(
        { email, password },
        secretToken,
        {
          expiresIn: "10d",
        },
      );
      return {
        user,
        token,
        refreshToken,
      };
    } catch (error) {
      console.error(error, "authService.login");
      throw new Error(error,"Error logging in user");
    }
  },
};

module.exports = { authService };
