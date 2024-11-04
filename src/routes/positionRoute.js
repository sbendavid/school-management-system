const express = require("express");

const positionRoute = express.Router();

const positionController = require("../controllers/positionController");

const { deletePosition } = positionController;

positionRoute.delete(
  "/:id",
  /**
      #swagger.summary = "Delete user position"
      #swagger.responses[200] = {
          schema:  { $ref: "#/definitions/PositionDeleted" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/PositionNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidPositionId" }
      }
    */
  deletePosition
);

module.exports = positionRoute;
