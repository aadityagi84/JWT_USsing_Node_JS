const mongoose = require("mongoose");
require("dotenv").config();

async function DatabseConnection(req, res) {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      `Database connected successfully: ${connection.connection.host}`
    );
    return connection;
  } catch (error) {
    console.log("error in databse Connection ", error);
  }
}

module.exports = { DatabseConnection };
