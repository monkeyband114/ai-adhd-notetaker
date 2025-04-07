import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();
  const { id } = event.pathParameters;

  // Soft delete by archiving the note
  const note = await Note.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true },
  );

  return {
    statusCode: 204,
    body: "",
  };
};
