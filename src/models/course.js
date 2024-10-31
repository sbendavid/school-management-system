const mongoose = require("mongoose");
const { Status } = require("./user");

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  class: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.NORMAL,
  },
});

module.exports = mongoose.model("Course", courseSchema);
