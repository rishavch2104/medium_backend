const mongoose = require("mongoose");
module.exports = () => {
  mongoose.connect("mongodb://localhost/medium_backend", {
    useNewUrlParser: true,
  });
  mongoose.set("useFindAndModify", false);

  mongoose.connection.on("connected", () => {
    console.log("connected to db");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected from db");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
