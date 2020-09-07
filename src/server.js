const app = require("./app");
const dotenv = require("dotenv");
const mongoInit = require("./database");
dotenv.config({ path: "config.env" });
mongoInit();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

// process.on("unhandledRejection", (err) => {
//   console.log(err.name, err.message);
//   err.printStackTrace();
//   server.close(() => {
//     process.exit(1);
//   });
// });
