const { authRepo } = require("../Repo/auth.repo");

const authService = {
  register: async (email, password) => {
    try {
      const user = await authRepo.createUser(email, password);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error registering user");
    }
  },
  login: async (email, password) => {
    try {
      const user = await authRepo.findUserByEmailAndPassword(email, password);
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const token = await jwt.sign(
        { email, password },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );
      const refreshToken = await jwt.sign(
        { email, password },
        process.env.JWT_SECRET,
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
      throw new Error("Error logging in user");
    }
  },
};

module.exports = { authService };
