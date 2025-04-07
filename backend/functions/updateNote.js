const { connectToDatabase } = require("../lib/db"); // Adjust path as needed
const { Note } = require("../lib/Note"); // Adjust path as needed

const handler = async (event) => {
  await connectToDatabase();

  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  // Handle sharedWith, pinned, and archived updates
  const updated = await Note.findByIdAndUpdate(
    id,
    {
      $set: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        reminders: data.reminders,
        pinned: data.pinned,
        archived: data.archived,
      },
      $addToSet: { sharedWith: { $each: data.sharedWith || [] } }, // Add collaborators
      $pull: { sharedWith: { email: { $in: data.removeSharedWith || [] } } }, // Remove collaborators
    },
    { new: true },
  );

  return {
    statusCode: 200,
    body: JSON.stringify(updated),
  };
};

module.exports = { handler };
