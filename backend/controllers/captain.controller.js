const Captain = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenService = require("../services/blackListToken.service");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password, vehicle } = req.body;
  try {
    const isCaptainExist = await captainService.getCaptainByEmail(email);
    if (isCaptainExist) {
      return res
        .status(400)
        .json({ error: "Captain with this email already exists" });
    }
    const hashedPassword = await Captain.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstName,
      lastName: lastName || "",
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    });
    const token = captain.generateAuthToken();
    return res.status(201).json({ token, captain });
  } catch (error) {
    return res.status(400).json({ error: errors.message });
  }
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainService.getCaptainByEmailWithPassword(email);
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  return res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  return res.status(200).json({ captain: req.captain });
};

module.exports.logOut = async (req, res, next) => {
  const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
  await blackListTokenService.createBlackListToken(token);
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
