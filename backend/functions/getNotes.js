import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async () => {
  await connectToDatabase();
  const notes = await Note.find({}).sort({ createdAt: -1 });

  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
};
