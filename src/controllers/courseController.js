const courseService = require("../services/courseService");
// const {
//   courseValidation,
//   updateCourseSchema,
//   updateCourseStatusSchema,
// } = require("../utils/validator");

const courseController = {
  async createCourse(req, res) {
    const { user, class: className, code, status } = req.body;

    const { error } = courseValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const newCourse = await courseService.createCourse({
        user,
        class: className,
        code,
        status,
      });
      return res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Course created",
        data: newCourse,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getAllCourses(req, res) {
    try {
      const courses = await courseService.getCourses();
      return res
        .status(200)
        .json({ status: 200, message: "Courses fetched", data: Courses });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getCourseById(req, res) {
    const { id } = req.params;

    try {
      const getCourse = await courseService.getCourseById(id);
      if (!getCourse) {
        return res
          .status(404)
          .json({ status: 404, message: "Course not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Course fetched", data: getCourse });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateCourse(req, res) {
    const { id } = req.params;
    const { name, grade, age } = req.body;

    try {
      const updatedCourse = await courseService.updateCourse(id, {
        name,
        grade,
        age,
      });

      if (!updatedCourse) {
        return res
          .status(404)
          .json({ status: 404, message: "Course not found" });
      }

      return res.status(200).json({
        status: 200,
        message: "Course updated",
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteCourse(req, res) {
    const { id } = req.params;

    try {
      const deleteCourse = await courseService.deleteCourse(id);
      if (!deleteCourse) {
        return res
          .status(404)
          .json({ status: 404, message: "Course not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Course deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = courseController;
