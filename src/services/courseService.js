const Course = require("../models/Course.js");

const CourseService = {
  async createCourse(data) {
    const course = new Course(data);
    return await course.save();
  },

  async getCourses() {
    return await Course.find();
  },

  async getCourseById(id) {
    return await Course.findById(id);
  },

  async updateCourse(id, updateData) {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedCourse;
  },

  async deleteCourse(id) {
    return await Course.findByIdAndDelete(id);
  },
};

module.exports = CourseService;
