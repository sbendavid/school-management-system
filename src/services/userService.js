const User = require("../models/user");

const UserService = {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  },

  async getUserById(id) {
    return await User.findById(id);
  },

  async getUserByEmail(email) {
    return await User.findOne({ email });
  },

  async findUserByRole(role) {
    return await User.findOne({ role });
  },

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  },

  async getUsers() {
    return await User.find();
  },
};

module.exports = UserService;
