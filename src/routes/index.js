const express = require("express");

const router = express.Router();

const signUp = require("./userRoutes/signup");
const login = require("./userRoutes/login");

const NotFoundError = require("./../errorHandling/apiError");

router.use("/signup", signUp);
router.use("/login", login);

router.all("*", (req, res, next) => {
  next(new NotFoundError());
});
module.exports = router;
