const express = require("express");

const classRoute = express.Router();

const studentController = require("../controllers/classController");

const { createClass, getAllClasses, getClassById, updateClass, deleteClass } =
  studentController;

classRoute.post("/", createClass);
classRoute.get("/", getAllClasses);
classRoute.get("/:id", getClassById);
classRoute.put("/:id", updateClass);
classRoute.delete("/:id", deleteClass);

module.exports = classRoute;
