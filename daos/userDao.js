const User = require("../models/userModel");

class UserDao {
  async createUser(user) {
    return await User.create(user);
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find({ isDeleted: false });
  }

  async updateUser(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}

module.exports = new UserDao();
