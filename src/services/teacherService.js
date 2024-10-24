const Teacher = require("../models/teacher");

const teacherService = {
  async createTeacher(data) {
    const teacher = new Teacher(data);
    return await teacher.save();
  },

  async getTeachers() {
    return await Teacher.find();
  },

  async getTeacherById(id) {
    return await Teacher.findById(id);
  },

  async updateTeacher(id, updateData) {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedTeacher;
  },

  async deleteTeacher(id) {
    return await Teacher.findByIdAndDelete(id);
  },
};

module.exports = teacherService;
