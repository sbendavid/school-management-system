const courseService = require("../services/courseService");
const UserService = require("../services/userService");
const {
  courseValidation,
  updateCourseValidation,
  updateCourseStatusValidation,
} = require("../validators/courseValidator");

const courseController = {
  async createCourse(req, res) {
    const { userId } = req.user;
    const { class: className, code, status } = req.body;

    const { error } = courseValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const newCourse = await courseService.createCourse({
        user: userId,
        class: className,
        code,
        status,
      });
      return res.status(201).json({
        status: "201",
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
        .json({ status: 200, message: "Courses fetched", data: courses });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
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
    const { class: className, code } = req.body;

    const { error } = updateCourseValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const course = await courseService.getCourseById(id);
      if (!course) {
        return res
          .status(404)
          .json({ status: 404, message: "Course not found" });
      }

      const updatedCourse = await courseService.updateCourse(id, {
        class: className,
        code,
      });

      return res.status(200).json({
        status: 200,
        message: "Course updated",
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateCourseStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const { error } = updateCourseStatusValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const course = await courseService.getCourseById(id);
      if (!course) {
        return res
          .status(404)
          .json({ status: 404, message: "Course not found" });
      }

      const updatedStatus = await courseService.updateCourse(id, {
        status,
      });

      return res.status(200).json({
        status: 200,
        message: "Status updated",
        data: updatedStatus,
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
