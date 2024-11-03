const Joi = require("joi");

const userUpdateValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    isStudent: Joi.string(),
    idNumber: Joi.string(),
    phoneNumber: Joi.string(),
    dateOfBirth: Joi.string(),
    // education: Joi.string(),
    parentFirstName: Joi.string(),
    parentLastName: Joi.string(),
    parentEmail: Joi.string(),
    parentAddress: Joi.string(),
    parentPhone: Joi.string(),
    address: Joi.string(),
    about: Joi.string(),
    expertise: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  userUpdateValidation,
};
