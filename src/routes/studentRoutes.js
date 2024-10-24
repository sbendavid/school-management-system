const express = require("express");

const studentRoute = express.Router();

const studentController = require("../controllers/studentController");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = studentController;

studentRoute.post("/", createStudent);
studentRoute.get("/", getAllStudents);
studentRoute.get("/:id", getStudentById);
studentRoute.put("/:id", updateStudent);
studentRoute.delete("/:id", deleteStudent);

module.exports = studentRoute;
