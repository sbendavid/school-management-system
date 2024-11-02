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
courseRoute.post(
  "/",
  /**
      #swagger.summary = "Create course"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/Course" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/CourseCreated" }
      }
      #swagger.responses[400] =  {
          schema:  { $ref: "#/components/schemas/CourseRequired" }
      }
      */
  createCourse
);
courseRoute.get(
  "/",
  /**
      #swagger.summary = "Fetch courses"
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/CourseFetched" }
      }
    */
  getAllCourses
);
courseRoute.get(
  "/:id",
  /**
      #swagger.summary = "Fetch courses"
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/CourseFetched" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/CourseNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidCourseId" }
      }
    */
  getCourseById
);
courseRoute.patch(
  "/:id",
  /**
      #swagger.summary = "Update a course"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/Course" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/CourseUpdated" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/CourseNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidCourseId" }
      }
    */
  updateCourse
);

courseRoute.patch(
  "/:id/status",
  /**
      #swagger.summary = "Update a course status"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/CourseStatus" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/CourseUpdated" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/CourseNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidCourseId" }
      }
    */
  updateCourseStatus
);
courseRoute.delete(
  "/:id",
  /**
      #swagger.summary = "Delete a course"
      #swagger.responses[200] = {
          schema:  { $ref: "#/definitions/CourseDeleted" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/CourseNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidCourseId" }
      }
    */
  deleteCourse
);

module.exports = courseRoute;
