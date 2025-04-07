import mongoose from "mongoose";

let conn = null;

export const connectToDatabase = async () => {
  if (conn == null) {
    conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "adhd_notes",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
};
