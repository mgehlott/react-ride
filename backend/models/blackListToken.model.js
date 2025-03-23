const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);
module.exports = BlackListToken;
