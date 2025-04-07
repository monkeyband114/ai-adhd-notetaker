const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let conn = null;

const connectToDatabase = async () => {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "adhd_notes",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  }
  return conn;
};

module.exports = { connectToDatabase };
