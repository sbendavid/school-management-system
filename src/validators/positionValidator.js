const Joi = require("joi");

const positionValidation = (data) => {
  const schema = Joi.object({
    class: Joi.string().required(),
    role: Joi.string().required(),
    course: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  positionValidation,
};
