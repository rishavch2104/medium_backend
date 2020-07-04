const express = require("express");
const userController = require("../../controller/userController");
const asyncHandler = require("./../../helpers/asyncHandler");
const router = express.Router();

router.post("/", asyncHandler(userController.loginUser));

module.exports = router;
