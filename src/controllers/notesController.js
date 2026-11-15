import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ notes });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({ _id: noteId });

  if (!note) {
    throw createHttpError(404, 'Note not found.');
  }
  res.status(200).json({
    note,
  });
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const noteToUpdate = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!noteToUpdate) {
    throw createHttpError(404, 'Note not found.');
  }

  res.status(200).json(noteToUpdate);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const noteToDelete = await Note.findOneAndDelete({ _id: noteId });

  if (!noteToDelete) {
    throw createHttpError(404, 'Note not found.');
  }

  res.status(200).json(noteToDelete);
};
