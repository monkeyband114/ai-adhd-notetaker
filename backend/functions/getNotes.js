import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
  await connectToDatabase();

  // Check if user wants only pinned or archived notes
  const { userId, pinned, archived } = event.queryStringParameters || {};

  // Build the filter query
  const filterQuery = { userId };

  if (pinned !== undefined) {
    filterQuery.pinned = JSON.parse(pinned);
  }

  if (archived !== undefined) {
    filterQuery.archived = JSON.parse(archived);
  }

  const notes = await Note.find(filterQuery).sort({ createdAt: -1 });

  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
};
