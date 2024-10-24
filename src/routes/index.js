const express = require("express");

const indexRoute = express.Router();

const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const classRoutes = require("./classRoutes");

indexRoute.use("/students", studentRoutes);
indexRoute.use("/teachers", teacherRoutes);
indexRoute.use("/classes", classRoutes);

module.exports = indexRoute;
