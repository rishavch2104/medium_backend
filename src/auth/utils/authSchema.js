const Joi = require("@hapi/joi");

const { JoiAuthBearer } = require("./../../helpers/validator");

module.exports = {
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
};
