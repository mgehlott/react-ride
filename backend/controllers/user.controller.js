const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const User = require("../models/user.model");
module.exports.registerUser = async (req, res, next) => {
  console.log('rrr', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstname, lastname, email, password } = req.body;
  try {
    const isUserExist = await userService.getUserByEmail(email);
    if (isUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await User.hashPassword(password);
    const user = await userService.createUser({
      firstname,
      lastname: lastname || "",
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
