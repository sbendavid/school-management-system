const express = require("express");

const authRoute = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const { register, login } = authController;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - idNumber
 *         - isStudent
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         email:
 *           type: string
 *           description: The user’s email address
 *         password:
 *           type: string
 *           description: The user’s password
 *         phoneNumber:
 *           type: string
 *           description: The user’s phone number
 *         idNumber:
 *           type: string
 *           description: Identification number of the user
 *         isAdmin:
 *           type: boolean
 *           description: Indicates if the user is an admin
 *         isStudent:
 *           type: boolean
 *           description: Indicates if the user is a student
 *         firstName:
 *           type: string
 *           description: The user’s first name
 *         lastName:
 *           type: string
 *           description: The user’s last name
 *         photo:
 *           type: string
 *           description: A URL to the user's profile photo
 *         dateOfBirth:
 *           type: string
 *           description: The user's date of birth
 *         placeOfBirth:
 *           type: string
 *           description: The user's place of birth
 *         education:
 *           type: object
 *           properties:
 *             university:
 *               type: string
 *             degree:
 *               type: string
 *             startDate:
 *               type: string
 *             endDate:
 *               type: string
 *             city:
 *               type: string
 *         status:
 *           type: string
 *           enum:
 *             - withdrawed
 *             - normal
 *             - suspended
 *           description: The user's current status
 *         parentFirstName:
 *           type: string
 *           description: First name of the user's parent
 *         parentLastName:
 *           type: string
 *           description: Last name of the user's parent
 *         parentEmail:
 *           type: string
 *           description: Email address of the user's parent
 *         parentAddress:
 *           type: string
 *           description: Address of the user's parent
 *         parentPhone:
 *           type: string
 *           description: Phone number of the user's parent
 *         address:
 *           type: string
 *           description: The user’s residential address
 *         about:
 *           type: string
 *           description: Brief description about the user
 *         expertise:
 *           type: string
 *           description: User’s area of expertise
 *       example:
 *         email: "example@gmail.com"
 *         password: "password123"
 *         phoneNumber: "123-456-7890"
 *         idNumber: "123456789"
 *         isAdmin: false
 *         isStudent: true
 *         firstName: "John"
 *         lastName: "Doe"
 *         photo: "https://example.com/profile.jpg"
 *         dateOfBirth: "1990-01-01"
 *         placeOfBirth: "New York"
 *         education:
 *           university: "Harvard University"
 *           degree: "Bachelor of Science"
 *           startDate: "2010-09-01"
 *           endDate: "2014-06-15"
 *           city: "Cambridge"
 *         status: "normal"
 *         parentFirstName: "Jane"
 *         parentLastName: "Doe"
 *         parentEmail: "parent@example.com"
 *         parentAddress: "123 Parent St"
 *         parentPhone: "123-456-7890"
 *         address: "456 Student Ave"
 *         about: "A dedicated student"
 *         expertise: "Computer Science"
 */

authRoute.post(
  "/register",
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registers a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Invalid input data
   *       409:
   *         description: User already exists
   *       500:
   *         description: Server error
   */
  register
);
authRoute.post(
  "/login",
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Logs in a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email
   *               password:
   *                 type: string
   *                 description: User's password
   *     responses:
   *       200:
   *         description: Login successful, returns a JWT token
   *       401:
   *         description: Unauthorized, invalid credentials
   *       500:
   *         description: Server error
   */
  login
);
authRoute.post(
  "/change_password",
  /**
   * @swagger
   * /auth/change_password:
   *   post:
   *     summary: Changes a user's password
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - currentPassword
   *               - newPassword
   *             properties:
   *               currentPassword:
   *                 type: string
   *                 description: User's current password
   *               newPassword:
   *                 type: string
   *                 description: New password to be set
   *     responses:
   *       200:
   *         description: Password changed successfully
   *       401:
   *         description: Unauthorized, current password is incorrect
   *       500:
   *         description: Server error
   */
  authMiddleware,
  authController.changePassword
);

module.exports = authRoute;
