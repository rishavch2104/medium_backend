const express = require("express");
const userController = require("../../controller/userController");
const asyncHandler = require("../../helpers/asyncHandler");
const schema = require("./schema");
const validator = require("./../../helpers/validator");
const router = express.Router();

router.post(
  "/",
  validator(schema.signup),
  asyncHandler(userController.signUpUser)
);

module.exports = router;
