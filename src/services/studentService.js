const { Student } = require("../models/student");

const studentService = {
  async createStudent(data) {
    const student = new Student(data);
    return await student.save();
  },

  async getStudents() {
      return await Student.find();
  },

  async getStudentById(id) {
    return await Student.findById(id);
  },

  async updateStudent(id, updateData) {
    const updateStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updateStudent;
  },

  async deleteStudent(id) {
    return await Student.findByIdAndDelete(id);
  },
};

module.exports = studentService;
