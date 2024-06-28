const userService = require("../services/userService");
const userValidator = require("../validators/userValidator");

class UserController {
  async createUser(req, res) {
    try {
      const { error } = userValidator.validateCreateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await userService.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const { error } = userValidator.validateId(req.params.id);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await userService.getUserById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { error } = userValidator.validateUpdateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async patchUser(req, res) {
    try {
      const { error } = userValidator.validateUpdateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { error } = userValidator.validateId(req.params.id);
      if (error) return res.status(400).send(error.details[0].message);

      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new UserController();
