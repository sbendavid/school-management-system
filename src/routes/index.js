const express = require("express");

const indexRoute = express.Router();

const authRoute = require("./authRoute");
const courseRoute = require("./courseRoute");

indexRoute.use(
  "/auth",
  // #swagger.tags = ['auth']
  // #swagger.security = [{ bearerAuth: true }],
  authRoute
);
indexRoute.use(
  "/course",
  // #swagger.tags = ['course']
  // #swagger.security = [{ bearerAuth: true }],
  courseRoute
);

module.exports = indexRoute;
