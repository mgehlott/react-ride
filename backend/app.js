const express = require("express");
const connectToDb = require("./db/db");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookiesParse = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParse());

connectToDb();
// app.use("/", () => {
//   console.log("OK");
// });

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
