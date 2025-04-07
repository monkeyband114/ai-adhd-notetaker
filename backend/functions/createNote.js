const { connectToDatabase } = require("../lib/db"); // Adjust the path if necessary
const { Note } = require("../lib/Note"); // Adjust the path if necessary

const handler = async (event) => {
  // Establish database connection
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

module.exports = { handler };
