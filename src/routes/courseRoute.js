const express = require("express");

const courseRoute = express.Router();

const courseController = require("../controllers/courseController");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = courseController;

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - class
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the course
 *         user:
 *           type: string
 *           description: The user offering the course
 *         class:
 *           type: string
 *           description: The class to be applied
 *         code:
 *           type: string
 *           format: date
 *           description: The course's code
 *         status:
 *           type: string
 *           description: Is the user offering the class
 *       example:
 *         user: 670b1ec806077423686e7d2f
 *         class: ABE
 *         code: 201
 *         status: normal
 */

courseRoute.post(
  "/",
  /**
   * @swagger
   * /course:
   *   post:
   *     summary: Creates a new course
   *     tags: [Courses]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Course'
   *     responses:
   *       201:
   *         description: The course was successfully created
   *       400:
   *         description: Data is required
   *       500:
   *         description: Server error
   */
  createCourse
);
courseRoute.get("/", getAllCourses);
courseRoute.get("/:id", getCourseById);
courseRoute.put("/:id", updateCourse);
courseRoute.delete("/:id", deleteCourse);

module.exports = courseRoute;
