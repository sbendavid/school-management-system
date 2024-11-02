const mongoose = require("mongoose");

const Status = Object.freeze({
  WITHDRAWED: "withdrawed",
  NORMAL: "normal",
  SUSPENDED: "suspended",
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    idNumber: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStudent: {
      type: Boolean,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    education: {
      university: String,
      degree: String,
      startDate: String,
      endDate: String,
      city: String,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.NORMAL,
    },
    parentFirstName: String,
    parentLastName: String,
    parentEmail: String,
    parentAddress: String,
    parentPhone: String,
    address: String,
    about: String,
    expertise: String,
  },
  { timestamps: true, versionKey: false }
);

Object.assign(userSchema.statics, { Status });

module.exports = mongoose.model("User", userSchema);
