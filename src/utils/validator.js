const Joi = require("joi");

const statusEnum = ["withdrawed", "normal", "suspended"]; // Define status enum values here

// Validation for creating a course
const courseValidation = (data) => {
  const schema = Joi.object({
    user: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "User ID must be a valid ObjectId",
      }),
    class: Joi.string().required(),
    code: Joi.string().required(),
    status: Joi.string()
      .valid(...statusEnum)
      .optional(),
  });

  return schema.validate(data);
};

// Validation for updating a course
const updateCourseSchema = Joi.object({
  class: Joi.string().optional(),
  code: Joi.string().optional(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
});

// Validation for updating course status only
const updateCourseStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
});

module.exports = {
  courseValidation,
  updateCourseSchema,
  updateCourseStatusSchema,
};
