const { Staff } = require("../Models/staff.model");

const authRepo = {
  createUser: async (userBodyData) => {
    try {
      const user = await Staff.create(userBodyData);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  findUserByEmailAndPassword: async (email, password) => {
    try {
      const user = await Staff.findOne({ email, password });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

module.exports = { authRepo };
