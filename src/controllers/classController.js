const classService = require("../services/classService");

const classController = {
  async createClass(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields",
      });
    }

    try {
      const newClass = await classService.createClass({
        name,
      });
      return res
        .status(201)
        .json({ status: 201, message: "Class created", data: newClass });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getAllClasses(req, res) {
    try {
      const classes = await classService.getClasses();
      return res
        .status(200)
        .json({ status: 200, message: "Classes fetched", data: classes });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getClassById(req, res) {
    const { id } = req.params;

    try {
      const getClass = await classService.getClassById(id);
      if (!getClass) {
        return res
          .status(404)
          .json({ status: 404, message: "Class not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Class fetched", data: getClass });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateClass(req, res) {
    const { id } = req.params;
    const { name, grade, age } = req.body;

    try {
      const updatedClass = await classService.updateClass(id, {
        name,
        grade,
        age,
      });

      if (!updatedClass) {
        return res
          .status(404)
          .json({ status: 404, message: "Class not found" });
      }

      return res.status(200).json({
        status: 200,
        message: "Class updated",
        data: updatedClass,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteClass(req, res) {
    const { id } = req.params;

    try {
      const deleteClass = await classService.deleteClass(id);
      if (!deleteClass) {
        return res
          .status(404)
          .json({ status: 404, message: "Class not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Class deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = classController;
