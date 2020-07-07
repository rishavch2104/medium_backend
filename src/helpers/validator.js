const { ValidationError } = require("./../errorHandling/apiError");
const Joi = require("@hapi/joi");

const validator = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
      console.log(source);
      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      return next(new ValidationError(message));
    } catch {
      next(error);
    }
  };
};

const JoiAuthBearer = () =>
  Joi.string().custom((value, helpers) => {
    if (!value.startsWith("Bearer")) return helpers.error("any.invalid");
    if (!value.split("")[1]) return helpers.error("any.invalid");
    return value;
  }, "Auth Header Validation");

module.exports = { validator, JoiAuthBearer };
