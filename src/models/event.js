const mongoose = require("mongoose");
const { Status } = require("./user");

const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  class: {
    type: String,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.NORMAL,
  },
});

module.exports = mongoose.model("Event", eventSchema);
