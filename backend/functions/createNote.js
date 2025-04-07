import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();
  const data = JSON.parse(event.body);

  // Default values for the new fields
  const newNote = await Note.create({
    ...data,
    pinned: data.pinned || false,
    archived: data.archived || false,
    sharedWith: data.sharedWith || [],
  });

  return {
    statusCode: 201,
    body: JSON.stringify(newNote),
  };
};
