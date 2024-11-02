const UserService = require("../services/userService");
const { hashPassword, comparePasswords } = require("../utils/bcrypt");
const {
  registerValidation,
  loginValidation,
  passwordValidation,
} = require("../validators/authValidator");
const { jwtSign } = require("../utils/jwt");

const authController = {
  async register(req, res) {
    const { email, password, firstName, lastName, isStudent, idNumber } =
      req.body;

    const { error } = registerValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
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

      res.status(201).json({
        status: 201,
        message: "User registered successfully",
        userId: user,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const user = await UserService.getUserByEmail(email);
      if (!user || !(await comparePasswords(password, user.password))) {
        return res
          .status(404)
          .json({ status: 404, message: "Invalid email or password" });
      }

      const token = await jwtSign({ userId: user._id, isAdmin: user.isAdmin });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  },

  async changePassword(req, res) {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;

    const { error } = passwordValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }

      const isPasswordValid = await comparePasswords(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ status: 401, message: "Current password is incorrect" });
      }

      const hashedNewPassword = await hashPassword(newPassword);

      const updatedUser = await UserService.updateUser(user._id, {
        password: hashedNewPassword,
      });

      res.status(200).json({
        status: 200,
        message: "Password changed successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = authController;
