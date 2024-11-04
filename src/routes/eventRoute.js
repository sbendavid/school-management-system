const express = require("express");

const eventRoute = express.Router();

const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  updateEventStatus,
  deleteEvent,
} = eventController;

// eventRoute.use(authMiddleware);
eventRoute.post(
  "/",
  /**
      #swagger.summary = "Create event"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/Event" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/EventCreated" }
      }
      #swagger.responses[400] =  {
          schema:  { $ref: "#/components/schemas/EventRequired" }
      }
      */
  createEvent
);
eventRoute.get(
  "/",
  /**
      #swagger.summary = "Fetch events"
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/EventFetched" }
      }
    */
  getAllEvents
);
eventRoute.get(
  "/:id",
  /**
      #swagger.summary = "Fetch events"
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/EventFetched" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/EventNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidEventId" }
      }
    */
  getEventById
);
eventRoute.patch(
  "/:id",
  /**
      #swagger.summary = "Update a event"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/Event" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/EventUpdated" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/EventNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidEventId" }
      }
    */
  updateEvent
);

eventRoute.patch(
  "/:id/status",
  /**
      #swagger.summary = "Update a event status"
      #swagger.requestBody = {
          required: true,
          schema: { $ref: "#/components/schemas/EventStatus" }
      }
      #swagger.responses[200] = {
          schema:  { $ref: "#/components/schemas/EventUpdated" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/EventNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidEventId" }
      }
    */
  updateEventStatus
);
eventRoute.delete(
  "/:id",
  /**
      #swagger.summary = "Delete a event"
      #swagger.responses[200] = {
          schema:  { $ref: "#/definitions/EventDeleted" }
      }
      #swagger.responses[404] = {
          schema:  { $ref: "#/components/schemas/EventNotFound" }
      }
      #swagger.responses[406] = {
          schema:  { $ref: "#/components/schemas/InvalidEventId" }
      }
    */
  deleteEvent
);

module.exports = eventRoute;
