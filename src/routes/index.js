const express = require("express");

const indexRoute = express.Router();

const authRoute = require("./authRoute");
const courseRoute = require("./courseRoute");

indexRoute.use("/auth", authRoute);
indexRoute.use("/course", courseRoute);

module.exports = indexRoute;
