const mongoose = require("mongoose");

const connectToDb = () => {
    console.log("mmmmm", process.env.DB_URL, process.env.PORT);
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Db connection established");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
