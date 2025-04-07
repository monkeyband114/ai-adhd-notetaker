import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();
  const data = JSON.parse(event.body);
  const newNote = await Note.create(data);

  return {
    statusCode: 201,
    body: JSON.stringify(newNote),
  };
};
