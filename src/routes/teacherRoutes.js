const express = require("express");

const teacherRoute = express.Router();

const teacherController = require("../controllers/teacherController");

const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = teacherController;

teacherRoute.post("/", createTeacher);
teacherRoute.get("/", getAllTeachers);
teacherRoute.get("/:id", getTeacherById);
teacherRoute.put("/:id", updateTeacher);
teacherRoute.delete("/:id", deleteTeacher);

module.exports = teacherRoute;
