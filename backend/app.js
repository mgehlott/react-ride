const express = require("express");
const connectToDb = require("./db/db");
require("dotenv").config();

const app = express();

// app.use(dotenv.config());

connectToDb();
app.use("/", () => {
  console.log("OK");
});

module.exports = app;
