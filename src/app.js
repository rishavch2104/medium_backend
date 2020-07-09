const express = require("express");
const morgan = require("morgan");
const router = require("./routes");

const globalErrorHandler = require("./errorHandling/globalErrorHandler");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/", router);

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new NotFoundError());
});

module.exports = app;
