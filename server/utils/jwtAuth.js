const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

function verifyToken(token) {
  if (!token) return;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

function getUserInfoFromToken(token) {
  const user = verifyToken(token);
  return user;
}

// const userInfo = {
//   userId: user._id,
//   name: user.name,
//   email: email,
// };

module.exports = { createToken, verifyToken, getUserInfoFromToken };
