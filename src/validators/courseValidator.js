const Joi = require("joi");

const statusEnum = ["withdrawed", "normal", "suspended"];

// Validation for creating a course
const courseValidation = (data) => {
  const schema = Joi.object({
    class: Joi.string().required(),
    code: Joi.string().required(),
    status: Joi.string()
      .valid(...statusEnum)
      .optional(),
  });

  return schema.validate(data);
};

// Validation for updating a course
const updateCourseValidation = (data) => {
  const schema = Joi.object({
    class: Joi.string().optional(),
    code: Joi.string().optional(),
    status: Joi.string()
      .valid(...statusEnum)
      .optional(),
  });

  return schema.validate(data);
};

// Validation for updating course status only
const updateCourseStatusValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid(...statusEnum)
      .required(),
  });

  return schema.validate(data);
};

module.exports = {
  courseValidation,
  updateCourseValidation,
  updateCourseStatusValidation,
};
