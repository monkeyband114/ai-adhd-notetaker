import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  tags: [String],
  reminders: [Date],
  createdAt: { type: Date, default: Date.now },
  userId: String,
});

export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
