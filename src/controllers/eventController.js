const eventService = require("../services/eventService");
const UserService = require("../services/userService");
const {
  eventValidation,
  updateEventValidation,
} = require("../validators/eventValidator");

const eventController = {
  async createEvent(req, res) {
    const {
      date,
      title,
      course,
      class: className,
      startTime,
      endTime,
      status,
    } = req.body;

    const { error } = eventValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const newEvent = await eventService.createEvent({
        date,
        title,
        course,
        class: className,
        startTime,
        endTime,
        status,
      });
      return res.status(201).json({
        status: "201",
        message: "Event created",
        data: newEvent,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getAllEvents(req, res) {
    try {
      const events = await eventService.getEvents();
      return res
        .status(200)
        .json({ status: 200, message: "Events fetched", data: events });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async getEventById(req, res) {
    const { id } = req.params;

    try {
      const getEvent = await eventService.getEventById(id);
      if (!getEvent) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Event fetched", data: getEvent });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateEvent(req, res) {
    const { id } = req.params;
    const {
      date,
      title,
      course,
      class: className,
      startTime,
      endTime,
    } = req.body;

    const { error } = updateEventValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    try {
      const event = await eventService.getEventById(id);
      if (!event) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      }

      const updatedEvent = await eventService.updateEvent(id, {
        date,
        title,
        course,
        class: className,
        startTime,
        endTime,
      });

      return res.status(200).json({
        status: 200,
        message: "Event updated",
        data: updatedEvent,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async updateEventStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    // const { error } = updateCourseStatusValidation(req.body);
    // if (error) {
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: error.details[0].message });
    // }

    try {
      const event = await eventService.getEventById(id);
      if (!event) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      }

      const updatedStatus = await eventService.updateEvent(id, {
        status,
      });

      return res.status(200).json({
        status: 200,
        message: "Status updated",
        data: updatedStatus,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },

  async deleteEvent(req, res) {
    const { id } = req.params;

    try {
      const deleteEvent = await eventService.deleteEvent(id);
      if (!deleteEvent) {
        return res
          .status(404)
          .json({ status: 404, message: "Event not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Event deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = eventController;
