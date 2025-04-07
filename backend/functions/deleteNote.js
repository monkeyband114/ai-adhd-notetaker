const { connectToDatabase } = require("../lib/db"); // Adjust path as necessary
const { Note } = require("../lib/Note"); // Adjust path as necessary

const handler = async (event) => {
  // Establish database connection
  await connectToDatabase();
  const { id } = event.pathParameters;
  const note = await Note.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true },
  );

  return {
    statusCode: 204,
    body: "", // Empty body as per HTTP 204 No Content
  };
};

module.exports = { handler };
