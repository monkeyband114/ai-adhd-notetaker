import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  const updated = await Note.findByIdAndUpdate(id, data, { new: true });

  return {
    statusCode: 200,
    body: JSON.stringify(updated),
  };
};
