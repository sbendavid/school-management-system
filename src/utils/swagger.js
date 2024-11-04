const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const openapi = require("../openapi.json");

const swaggerDocs = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(openapi));
};

module.exports = swaggerDocs;
