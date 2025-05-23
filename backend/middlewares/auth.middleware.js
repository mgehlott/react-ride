const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const blackListTokenService = require("../services/blackListToken.service");
const captainService = require("../services/captain.service");
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
  console.log(req.cookies, req.headers, token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackListed = await blackListTokenService.findByToken(token);
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const user = await userService.getUserById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackListed = await blackListTokenService.findByToken(token);
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
    const captain = await captainService.getCaptainById(decoded._id);
    req.captain = captain;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized Token" });
  }
};
