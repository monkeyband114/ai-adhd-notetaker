import { connectToDatabase } from "../lib/db.js";
import { Note } from "../lib/Note.js";

export const handler = async (event) => {
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
      $addToSet: { sharedWith: { $each: data.sharedWith || [] } }, // Handle adding new collaborators
      $pull: { sharedWith: { email: { $in: data.removeSharedWith || [] } } }, // Handle removing collaborators
    },
    { new: true },
  );

  return {
    statusCode: 200,
    body: JSON.stringify(updated),
  };
};
