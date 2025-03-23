const BlackListToken = require("../models/blackListToken.model");

module.exports.createBlackListToken = async (token) => {
  return await BlackListToken.create({ token });
};
module.exports.findByToken = async (token) => {
  return await BlackListToken.findOne({ token: token });
};
