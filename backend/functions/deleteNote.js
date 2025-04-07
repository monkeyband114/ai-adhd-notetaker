import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();
  const { id } = event.pathParameters;

  await Note.findByIdAndDelete(id);

  return {
    statusCode: 204,
    body: "",
  };
};
