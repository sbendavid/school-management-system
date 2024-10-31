const Event = require("../models/event");

const eventService = {
  async createEvent(data) {
    try {
      const event = new Event(data);
      return await event.save();
    } catch (error) {
      throw new Error("Error creating event: " + error.message);
    }
  },

  async getAllEvents() {
    try {
      return await Event.find();
    } catch (error) {
      throw new Error("Error fetching events: " + error.message);
    }
  },

  async getEventById(id) {
    try {
      const event = await Event.findById(id);
      if (!event) throw new Error("Event not found");
      return event;
    } catch (error) {
      throw new Error("Error fetching event: " + error.message);
    }
  },

  async updateEvent(id, updateData) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!updatedEvent) throw new Error("Event not found");
      return updatedEvent;
    } catch (error) {
      throw new Error("Error updating event: " + error.message);
    }
  },

  async deleteEvent(id) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) throw new Error("Event not found");
      return deletedEvent;
    } catch (error) {
      throw new Error("Error deleting event: " + error.message);
    }
  },
};

module.exports = eventService;
