const UserService = require("../services/userService");
const PositionService = require("../services/positionService");
const { hashPassword } = require("../utils/bcrypt");
const { registerValidation } = require("../validators/authValidator");
const { positionValidation } = require("../validators/positionValidator");
const { userValidation } = require("../validators/userValidator");

const userController = {
  async createUser(req, res) {
    const { email, password, firstName, lastName, isStudent, idNumber } =
      req.body;

    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }

    try {
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ status: 409, message: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await UserService.createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isStudent,
        idNumber,
      });
      return res
        .status(201)
        .json({ status: 201, message: "User Created", data: user });
    } catch (error) {
      return res.status(400).json({ status: 500, message: error.message });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      return res
        .status(200)
        .json({ status: 200, message: "Users fetched", data: users });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "User fetched", data: user });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      isStudent,
      idNumber,
      phoneNumber,
      dateOfBirth,
      education,
      parentFirstName,
      parentLastName,
      parentEmail,
      parentAddress,
      parentPhone,
      address,
      about,
      expertise,
    } = req.body;

    const { error } = userValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      const updatedUser = await UserService.updateUser(id, {
        firstName,
        lastName,
        isStudent,
        idNumber,
        phoneNumber,
        dateOfBirth,
        education,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentAddress,
        parentPhone,
        address,
        about,
        expertise,
      });

      return res
        .status(200)
        .json({ status: 200, message: "User updated", data: updatedUser });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateUserStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      const updatedStatus = await UserService.updateUser(id, { status });

      return res
        .status(200)
        .json({ status: 200, message: "Status updated", data: updatedStatus });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const deleteUser = await UserService.deleteUser(id);
      if (!deleteUser) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
      return res.status(200).json({ status: 200, message: "User deleted" });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async assignPosition(req, res) {
    const { id } = req.params;
    const { role, class: className, course } = req.body;

    const { error } = positionValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      const position = await PositionService.createPosition({
        user: user._id,
        role,
        class: className,
        course,
      });

      return res
        .status(201)
        .json({ status: 201, message: "Position created", data: position });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = userController;
