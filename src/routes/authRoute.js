const express = require("express");

const authRoute = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const { register, login, changePassword } = authController;

authRoute.post(
  "/register",
  /**
      #swagger.summary = "Create user"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/User" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/UserCreated" }
      }
      #swagger.responses[400] =  {
          schema:  { $ref: "#/components/schemas/UserRequired" }
      }
    */
  register
);
authRoute.post(
  "/login",
  /**
    #swagger.summary = "Login"
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/Login" }
    }
    #swagger.responses[200] = {
        schema:  { $ref: "#/components/schemas/LoginSuccess" }
    }
    #swagger.responses[400] = {
        schema:  { $ref: "#/components/schemas/InvalidEmailOrPassword" }
    }
    #swagger.responses[401] = {
        schema:  { $ref: "#/components/schemas/InvalidPassword" }
    }
    #swagger.responses[404] = {
        schema:  { $ref: "#/components/schemas/EmailDoesNotExists" }
    }
    */
  login
);
authRoute.post(
  "/change_password",
  /**
    #swagger.summary = "change password"
    #swagger.responses[200] = {
        schema:  { $ref: "#/components/schemas/LoginSuccess" }
    }
    #swagger.responses[400] = {
        schema:  { $ref: "#/components/schemas/InvalidEmailOrPassword" }
    }
    #swagger.responses[401] = {
        schema:  { $ref: "#/components/schemas/InvalidPassword" }
    }
    #swagger.responses[404] = {
        schema:  { $ref: "#/components/schemas/EmailDoesNotExists" }
    }
    */
  authMiddleware,
  changePassword
);

module.exports = authRoute;
