const express = require("express");

const courseRoute = express.Router();

const courseController = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  updateCourseStatus,
  deleteCourse,
} = courseController;

courseRoute.use(authMiddleware);
courseRoute.post("/", createCourse);
courseRoute.get("/", getAllCourses);
courseRoute.get("/:id", getCourseById);
courseRoute.patch("/:id", updateCourse);
courseRoute.patch("/:id/status", updateCourseStatus);
courseRoute.delete("/:id", deleteCourse);

module.exports = courseRoute;
