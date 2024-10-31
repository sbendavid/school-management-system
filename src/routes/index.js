const express = require("express");

const indexRoute = express.Router();

const courseRoute = require("./courseRoute");

indexRoute.use(
  "/course",
  // #swagger.tags = ['courses']
  courseRoute
);

module.exports = indexRoute;
