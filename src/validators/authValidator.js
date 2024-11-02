const Joi = require("joi");

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

module.exports = {
  registerValidation,
  loginValidation,
  passwordValidation,
};
