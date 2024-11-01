const Joi = require("joi");

const statusEnum = ["withdrawed", "normal", "suspended"];

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().max(224).required(),
    lastName: Joi.string().max(224).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
        "password"
      )
      .message(
        ```
        Password must be between 8 and 32 characters long 
        and contain at least one uppercase letter 
        and at least one number with a spacial character.
        ```
      )
      .required(),
    isStudent: Joi.bool().required(),
    idNumber: Joi.string().required(),
  });

  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const passwordValidation = (data) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

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
  registerValidation,
  loginValidation,
  passwordValidation,
  courseValidation,
  updateCourseSchema,
  updateCourseStatusSchema,
};
