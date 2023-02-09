require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login and register with JWT (no api)
app.use("/api", require("./routes/auth"));

// api routes -- OAuth2 with Google API, facebook API, etc.

// private account
//app.use("/api", require("./routes/private"));

app.use(errorHandler);

module.exports = app;