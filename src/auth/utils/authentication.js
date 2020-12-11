const express = require("express");
const schema = require("./authSchema");
const validator = require("./../../helpers/validator");
const asyncHandler = require("./../../helpers/asyncHandler");
const userService = require("./../../database/services/userService");
const keystoreService = require("./../../database/services/keyStoreService");
const { getAccessToken } = require("./authHelpers");
const {
  NotFoundError,
  InvalidTokenError,
} = require("./../../errorHandling/apiError");
const JWT = require("./JWT");
const router = express.Router();

router.use(
  validator(schema.auth, "headers"),
  asyncHandler(async (req, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization);
    console.log(req.accessToken);

    try {
      const payload = await JWT.validate(req.accessToken);
      const user = await userService.findUserById(payload.sub);
      if (!user) throw new NotFoundError("user");
      req.user = user;

      const keystore = await keystoreService.findKeyByParams({
        user: req.user._id,
      });
      if (!keystore) throw new InvalidTokenError();
      req.keystore = keystore;
      return next();
    } catch (e) {
      throw e;
    }
  })
);
module.exports = router;
