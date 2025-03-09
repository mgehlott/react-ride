const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      require: true,
      minLength: [3, "First must be at least 6 characters"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last must be at least 6 characters"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
