const express = require("express");
const asyncHandler = require("./../../helpers/asyncHandler");
const userController = require("./../../controller/userController");

const authentication = require("./../../auth/utils/authentication");

const router = express.Router();

router.delete("/", authentication, asyncHandler(userController.logoutUser));

module.exports = router;
