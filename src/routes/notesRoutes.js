import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/notes', celebrate(getNotesSchema), getAllNotes);

router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

router.post('/notes', createNote);

router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

export default router;
