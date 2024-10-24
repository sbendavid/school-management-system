const teacherService = require("../services/teacherService");

const teacherController = {
  async createTeacher(req, res) {
    const { name, subject } = req.body;

    if (!name || !subject) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields",
      });
    }

    try {
      const newTeacher = await teacherService.createTeacher({
        name,
        subject,
      });
      return res
        .status(201)
        .json({ status: 201, message: "Teacher created", data: newTeacher });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getAllTeachers(req, res) {
    try {
      const teachers = await teacherService.getTeachers();
      return res
        .status(200)
        .json({ status: 200, message: "Teachers fetched", data: teachers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getTeacherById(req, res) {
    const { id } = req.params;

    try {
      const teacher = await teacherService.getTeacherById(id);
      if (!teacher) {
        return res
          .status(404)
          .json({ status: 404, message: "Teacher not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Teacher fetched", data: teacher });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateTeacher(req, res) {
    const { id } = req.params;
    const { name, subject } = req.body;

    try {
      const updatedTeacher = await teacherService.updateTeacher(id, {
        name,
        subject,
      });

      if (!updatedTeacher) {
        return res
          .status(404)
          .json({ status: 404, message: "Teacher not found" });
      }

      return res.status(200).json({
        status: 200,
        message: "Teacher updated",
        data: updatedTeacher,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteTeacher(req, res) {
    const { id } = req.params;

    try {
      const deleteTeacher = await teacherService.deleteTeacher(id);
      if (!deleteTeacher) {
        return res
          .status(404)
          .json({ status: 404, message: "Teacher not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Teacher deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = teacherController;
