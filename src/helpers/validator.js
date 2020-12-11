const { ValidationError } = require("./../errorHandling/apiError");
const Joi = require("@hapi/joi");

const validator = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
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

module.exports = validator;
