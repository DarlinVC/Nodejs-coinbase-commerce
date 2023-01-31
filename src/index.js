const app = require("./app");
const mongoose = require("mongoose");

// configs
const { ENV } = require("../configs/configs");

// starting server and conection with database
mongoose.Promise = global.Promise;
mongoose
  .connect(ENV.DB.URL)
  .then(() => {
    console.log("CONECTION SUCCESSFULL!!!");

    // SERVER EXECUTE
    app.listen(ENV.global.port | 3200, () => {
      console.log("SERVER RUNNING...");
    });
  })
  .catch((err) => console.error(err));
