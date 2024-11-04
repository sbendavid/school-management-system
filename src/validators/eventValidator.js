const Joi = require("joi");

const statusEnum = ["withdrawed", "normal", "suspended"];

// Validation for creating a course
const eventValidation = (data) => {
  const schema = Joi.object({
    date: Joi.string().required(),
    title: Joi.string().required(),
    course: Joi.string().optional(),
    class: Joi.string().optional(),
    startTime: Joi.number().required(),
    endTime: Joi.number().required(),
    status: Joi.string()
      .valid(...statusEnum)
      .optional(),
  });

  return schema.validate(data);
};

// Validation for updating a course
const updateEventValidation = (data) => {
  const schema = Joi.object({
    date: Joi.string().optional(),
    title: Joi.string().optional(),
    course: Joi.string().optional(),
    class: Joi.string().optional(),
    startTime: Joi.number().optional(),
    endTime: Joi.number().optional(),
  });

  return schema.validate(data);
};

module.exports = {
  eventValidation,
  updateEventValidation,
};
