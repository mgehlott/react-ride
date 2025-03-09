const express = require("express");
const connectToDb = require("./db/db");
require("dotenv").config();
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectToDb();
app.use("/", () => {
  console.log("OK");
});

app.user('/users', userRoutes);

module.exports = app;
