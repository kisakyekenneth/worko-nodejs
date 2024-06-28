const userDao = require("../daos/userDao");
const userDto = require("../dtos/userDto");

class UserService {
  async createUser(userData) {
    const user = await userDao.createUser(userData);
    return userDto.toResponse(user);
  }

  async getUserById(userId) {
    const user = await userDao.getUserById(userId);
    if (!user || user.isDeleted) {
      throw new Error("User not found");
    }
    return userDto.toResponse(user);
  }

  async getAllUsers() {
    const users = await userDao.getAllUsers();
    return users.map((user) => userDto.toResponse(user));
  }

  async updateUser(userId, userData) {
    const user = await userDao.updateUser(userId, userData);
    if (!user) {
      throw new Error("User not found");
    }
    return userDto.toResponse(user);
  }

  async patchUser(userId, userData) {
    const user = await userDao.updateUser(userId, userData);
    if (!user) {
      throw new Error("User not found");
    }
    return userDto.toResponse(user);
  }

  async deleteUser(userId) {
    const user = await userDao.deleteUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
