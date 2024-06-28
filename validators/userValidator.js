const Joi = require("joi");

const validateCreateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    age: Joi.number().min(1).required(),
    city: Joi.string().min(2).required(),
    zipCode: Joi.string()
      .regex(/^\d{5}$/)
      .required(),
  });
  return schema.validate(user);
};

const validateUpdateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string().min(3),
    age: Joi.number().min(1),
    city: Joi.string().min(2),
    zipCode: Joi.string().regex(/^\d{5}$/),
  });
  return schema.validate(user);
};

const validateId = (id) => {
  const schema = Joi.string().length(24).hex().required(); // Assuming MongoDB ObjectID format
  return schema.validate(id);
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateId,
};
