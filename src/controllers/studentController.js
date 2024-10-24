const studentService = require("../services/studentService");

const studentController = {
  async createStudent(req, res) {
    const { name, grade, age } = req.body;

    if (!name || !grade || !age) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields",
      });
    }

    try {
      const newStudent = await studentService.createStudent({
        name,
        grade,
        age,
      });
      return res
        .status(201)
        .json({ status: 201, message: "Student created", data: newStudent });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getAllStudents(req, res) {
    try {
      const students = await studentService.getStudents();
      return res
        .status(200)
        .json({ status: 200, message: "Students fetched", data: students });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getStudentById(req, res) {
    const { id } = req.params;

    try {
      const student = await studentService.getStudentById(id);
      if (!student) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Student fetched", data: student });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateStudent(req, res) {
    const { id } = req.params;
    const { name, grade, age } = req.body;

    try {
      const updatedStudent = await studentService.updateStudent(id, {
        name,
        grade,
        age,
      });

      if (!updatedStudent) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }

      return res.status(200).json({
        status: 200,
        message: "Student updated",
        data: updatedStudent,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteStudent(req, res) {
    const { id } = req.params;

    try {
      const deleteStudent = await studentService.deleteStudent(id);
      if (!deleteStudent) {
        return res
          .status(404)
          .json({ status: 404, message: "Student not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Student deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = studentController;
