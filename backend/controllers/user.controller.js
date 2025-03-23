const { validationResult } = require("express-validator");
const userService = require("../services/user.service");
const User = require("../models/user.model");
const blackListTokenService = require('../services/blackListToken.service');
module.exports.registerUser = async (req, res, next) => {
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

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userService.getUserByEmailWithPassword(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ user, token });
};

module.exports.getUserProfile = (req, res, next) => {
  return res.json(req.user);
};

module.exports.logOut = async (req, res, next) => {
  const token = req.cookie.token || req?.headers?.authorization?.split(" ")[1];
  await blackListTokenService.createBlackListToken(token);
  res.clearCookies("token");
  res.status(200).json({ message: "Logged out successfully" });
};
