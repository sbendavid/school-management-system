const express = require("express");

const studentRoute = express.Router();

const studentController = require("../controllers/studentController");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = studentController;

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *         - placeOfBirth
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the student
 *         firstName:
 *           type: string
 *           description: The student's first name
 *         lastName:
 *           type: string
 *           description: The student's last name
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The student's date of birth
 *         placeOfBirth:
 *           type: string
 *           description: The student's place of birth
 *         email:
 *           type: string
 *           description: The student's email address
 *         phone:
 *           type: string
 *           description: The student's phone number
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         dateOfBirth: 2000-01-01
 *         placeOfBirth: New York
 *         email: johndoe@example.com
 *         phone: +123456789
 */

studentRoute.post(
  "/",
  /**
   * @swagger
   * /students:
   *   post:
   *     summary: Creates a new student
   *     tags: [Students]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Student'
   *     responses:
   *       201:
   *         description: The student was successfully created
   *       500:
   *         description: Server error
   */
  createStudent
);

studentRoute.get(
  "/",
  /**
   * @swagger
   * /students:
   *   get:
   *     summary: Returns a list of students
   *     tags: [Students]
   *     responses:
   *       200:
   *         description: The list of students
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Student'
   */
  getAllStudents
);
studentRoute.get("/:id", getStudentById);
studentRoute.put("/:id", updateStudent);
studentRoute.delete("/:id", deleteStudent);

module.exports = studentRoute;
