const jwt = require("jsonwebtoken");

const CONFIG = require("../config/config.js");

const JWT_SECRET = `${CONFIG.ENV.JWT_SECRET}`;

const jwtSign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "12h",
  });
};

const jwtVerify = (token, callback) => {
  return jwt.verify(token, JWT_SECRET, callback);
};

module.exports = { jwtSign, jwtVerify };
