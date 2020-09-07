const express = require("express");
const router = express.Router();
const userController = require("./../../controller/userController");
const asyncHandler = require("./../../helpers/asyncHandler");
const validator = require("./../../helpers/validator");
const authentication = require("../../auth/utils/authentication");
const schema = require("./schema");

router
  .route("/login")
  .post(
    validator(schema.userCredentials),
    asyncHandler(userController.loginUser)
  );

router
  .route("/signup")
  .post(validator(schema.signup), asyncHandler(userController.signUpUser));

router
  .route("/refresh")
  .post(authentication, asyncHandler(userController.refreshToken));

router
  .route("/logout")
  .delete(authentication, asyncHandler(userController.logoutUser));

module.exports = router;
