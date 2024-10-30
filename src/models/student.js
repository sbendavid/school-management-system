const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "debit"],
    required: true,
  },
});

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          const phoneRegex = /^\+\d{1,3}\s?\d{1,15}$/;
          return phoneRegex.test(value);
        },
        message: "Invalid phone number format",
      },
    },
    address: {
      type: String,
      required: true,
    },
    parents: [parentSchema],
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format",
      },
    },
    photo: {
      type: String,
      validate: {
        validator: (value) => {
          const imageRegex = /^data:image\/\w+;base64,/;
          return imageRegex.test(value);
        },
        message: "Invalid image format",
      },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
const Parent = mongoose.model("Parent", parentSchema);

module.exports = { Student, Parent };
