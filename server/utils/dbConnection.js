const { connect } = require("mongoose");

async function dbConnection(url) {
  return await connect(url);
}

module.exports = { dbConnection };
