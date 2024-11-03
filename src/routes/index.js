const express = require("express");

const indexRoute = express.Router();

const authRoute = require("./authRoute");
const courseRoute = require("./courseRoute");
const userRoute = require("./userRoute");
const positionRoute = require("./positionRoute");

indexRoute.use(
  "/auth",
  // #swagger.tags = ['auth']
  // #swagger.security = [{ bearerAuth: true }],
  authRoute
);
indexRoute.use(
  "/courses",
  // #swagger.tags = ['course']
  // #swagger.security = [{ bearerAuth: true }],
  courseRoute
);

indexRoute.use(
  "/users",
  // #swagger.tags = ['user']
  // #swagger.security = [{ bearerAuth: true }],
  userRoute
);

indexRoute.use(
  "/positions",
  // #swagger.tags = ['position']
  // #swagger.security = [{ bearerAuth: true }],
  positionRoute
);

module.exports = indexRoute;
