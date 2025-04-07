import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  summary: String,
  tags: [String],
  reminders: [Date],
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },

  // 🔒 Collaboration
  sharedWith: [
    {
      email: { type: String, required: true }, // or userId if you have users
      permission: { type: String, enum: ["read", "write"], default: "read" },
    },
  ],

  // 📌 UI State
  pinned: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
});

export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
