const app = require("./app");
const dotenv = require("dotenv");
const mongoInit = require("./database");
dotenv.config({ path: "config.env" });
mongoInit()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    server.close(() => {
      process.exit(1);
    });
  });
