
import { toast } from "sonner";

// Types for our data model
export interface Note {
  id: string;
  noteId?: string; // API response field
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  isShared: boolean;
  pinned?: boolean; // API response field
  archived?: boolean; // API response field
  sharedWith?: string[]; // API response field
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId?: string; // API response field
  summary?: string; // API response field
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  isShared?: boolean;
  tags?: string[];
}

// Base URL for our API endpoints
const API_BASE_URL = "https://snddgzkuuj.execute-api.eu-north-1.amazonaws.com/dev";

// Helper function for handling API errors
const handleApiError = (error: Error) => {
  console.error("API Error:", error);
  toast.error("An error occurred while connecting to the server");
  throw error;
};

// Notes API service
export const notesService = {
  // Get all notes
  async getAllNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const notes = await response.json();
      return notes.map(this.normalizeNote);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Normalize API response to match our interface
  normalizeNote(apiNote: any): Note {
    return {
      id: apiNote.noteId || apiNote.id,
      title: apiNote.title,
      content: apiNote.content,
      isPinned: apiNote.pinned || apiNote.isPinned || false,
      isArchived: apiNote.archived || apiNote.isArchived || false,
      isShared: apiNote.sharedWith ? apiNote.sharedWith.length > 0 : (apiNote.isShared || false),
      tags: apiNote.tags || [],
      createdAt: apiNote.createdAt,
      updatedAt: apiNote.updatedAt,
      noteId: apiNote.noteId,
      userId: apiNote.userId,
      summary: apiNote.summary,
      sharedWith: apiNote.sharedWith
    };
  },

  // Get pinned notes
  async getPinnedNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/pinned`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const notes = await response.json();
      return notes.map(this.normalizeNote);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Get archived notes
  async getArchivedNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/archived`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const notes = await response.json();
      return notes.map(this.normalizeNote);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Get shared notes
  async getSharedNotes(): Promise<Note[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/shared`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const notes = await response.json();
      return notes.map(this.normalizeNote);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Get note by ID
  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const note = await response.json();
      return this.normalizeNote(note);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Create a new note
  async createNote(noteData: CreateNoteDto): Promise<Note> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const note = await response.json();
      return this.normalizeNote(note);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Update an existing note
  async updateNote(id: string, noteData: UpdateNoteDto): Promise<Note> {
    try {
      // Use noteId if available, fallback to id
      const noteId = id.includes('-') ? id : id;
      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const note = await response.json();
      return this.normalizeNote(note);
    } catch (error) {
      return handleApiError(error as Error);
    }
  },

  // Delete a note
  async deleteNote(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
    } catch (error) {
      handleApiError(error as Error);
    }
  },

  // Summarize a note
  async summarizeNote(content: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data.summary;
    } catch (error) {
      return handleApiError(error as Error);
    }
  }
};
