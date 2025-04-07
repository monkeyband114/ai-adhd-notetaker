const { connectToDatabase } = require("../lib/db"); // Adjust path if necessary
const { Note } = require("../lib/Note"); // Adjust path if necessary

const handler = async (event) => {
  // Establish database connection
  await connectToDatabase();

  // Extract userId, pinned, and archived from queryStringParameters
  const { userId, pinned, archived } = event.queryStringParameters || {};

  // Build the filter query
  const filterQuery = { userId };

  if (pinned !== undefined) {
    filterQuery.pinned = JSON.parse(pinned);
  }

  if (archived !== undefined) {
    filterQuery.archived = JSON.parse(archived);
  }

  // Query the notes collection with the filter query
  const notes = await Note.find(filterQuery).sort({ createdAt: -1 });

  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
};

module.exports = { handler };
