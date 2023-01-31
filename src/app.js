const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let routes = require("./routes/routes");

// see the requests by console
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Initializing core middlewares.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// active and using routes
app.use("/api", routes);

// exports
module.exports = app;
