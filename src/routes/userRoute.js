const express = require("express");

const userRoute = express.Router();

const userController = require("../controllers/userController");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
  assignPosition,
} = userController;

userRoute.post(
  "/",
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
  createUser
);
userRoute.get(
  "/",
  /**
      #swagger.summary = "Fetch user"
      #swagger.security = []
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/UserFetched" }
      }
    */
  getUsers
);
userRoute.get(
  "/:id",
  /**
      #swagger.summary = "Fetch user"
      #swagger.security = []
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/UserFetched" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/UserNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidUserId" }
      }
    */
  getUserById
);
userRoute.patch(
  "/:id",
  /**
      #swagger.summary = "Update a user"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/User" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/UserUpdated" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/UserNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidUserId" }
      }
    */
  updateUser
);
userRoute.patch(
  "/:id/status",
  /**
        #swagger.summary = "Update a user"
        #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/User" }
        }
        #swagger.responses[200] = {
            schema:  { $ref: "#/components/schemas/UserUpdated" }
        }
        #swagger.responses[404] = {
            schema:  { $ref: "#/components/schemas/UserNotFound" }
        }
        #swagger.responses[406] = {
            schema:  { $ref: "#/components/schemas/InvalidUserId" }
        }
      */
  updateUserStatus
);
userRoute.delete(
  "/:id",
  /**
      #swagger.summary = "Delete a user"
      #swagger.responses[200] = {
          schema:  { $ref: "#/definitions/UserDeleted" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/UserNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidUserId" }
      }
    */
  deleteUser
);
userRoute.post(
  "/:id/position",
  /**
      #swagger.summary = "Create user position"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/Position" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/PositionCreated" }
      }
      #swagger.responses[400] =  {
          schema:  { $ref: "#/components/schemas/PositionRequired" }
      }
    */
  assignPosition
);

module.exports = userRoute;
