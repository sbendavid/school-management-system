const express = require("express");

const indexRoute = express.Router();

const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const classRoutes = require("./classRoutes");

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
indexRoute.get("/", async (req, res) => {
  // Sample data or actual MongoDB query here
  res.json([{ id: 1, name: "Samantha" }]);
});

indexRoute.use("/students", studentRoutes);
indexRoute.use("/teachers", teacherRoutes);
indexRoute.use("/classes", classRoutes);

module.exports = indexRoute;
