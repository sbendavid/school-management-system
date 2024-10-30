const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  university: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const teacherSchema = new mongoose.Schema({
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
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
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
  photo: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const imageRegex = /^data:image\/\w+;base64,/;
        return imageRegex.test(value);
      },
      message: "Invalid image format",
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  education: [educationSchema],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
const Education = mongoose.model("Education", educationSchema);

module.exports = { Teacher, Education };
