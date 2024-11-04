const swaggerAutogen = require("swagger-autogen");
const fs = require("fs");
const schemas = require("./schemas");
const definitions = require("./definitions");

const documentation = {
  openapi: "3.0.0",
  info: {
    title: "School Management API",
    description:
      "API documentation for managing students, teachers, and parents",
    version: "1.0.0",
    contact: {
      name: "sbendavid",
    },
  },

  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],

  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Server",
    },
    {
      url: "https://not-hosted-yet.onrender.com/api/",
      description: "Remote Host",
    },
  ],

  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  definitions: definitions,
};

const sourceFile = `./src/openapi.json`;
const endpointsFiles = ["../src/routes/index"];

swaggerAutogen({ openapi: "3.0.0" })(
  sourceFile,
  endpointsFiles,
  documentation
).then((e) => {
  console.log("Generated", sourceFile, "\n");
});
