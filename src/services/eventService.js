const Event = require("../models/event");

const eventService = {
  async createEvent(data) {
    const event = new Event(data);
    return await event.save();
  },

  async getEvents() {
    return await Event.find();
  },

  async getEventById(id) {
    return await Event.findById(id);
  },

  async updateEvent(id, updateData) {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedEvent;
  },

  async deleteEvent(id) {
    return await Event.findByIdAndDelete(id);
  },
};

module.exports = eventService;
