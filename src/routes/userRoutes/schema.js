const Joi = require("@hapi/joi");

module.exports = {
  userCredentials: Joi.object.keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  signup: Joi.object.keys({
    name: Joi.string().required().min(3).max(10),
    email: Joi.string().required.email(),
    password: Joi.alphanumeric().required().min(6),
  }),
};
