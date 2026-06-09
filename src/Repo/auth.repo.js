const { Staff } = require("../Models/staff.model");

const authRepo = {
  createUser: async (email, password) => {
    try {
      const user = await Staff.create({ email, password });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  },
  findUserByEmailAndPassword: async (email, password) => {
    try {
      const user = await Staff.findOne({ email, password });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user");
    }
  },
};

module.exports = { authRepo };
