const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.createUser = async (user) => {
  const { firstname, lastname, email, password } = user;
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = User.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports.getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

module.exports.getUserById = async (id) => {
  const tempId = mongoose.Types.ObjectId(id);
  return await User.findById();
};
