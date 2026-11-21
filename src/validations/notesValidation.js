import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.QUERY]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    content: Joi.string().trim().allow('').max(500),
    tag: Joi.string().valid(TAGS),
  }).min(1),
};

export const updateNoteSchema = {
  [Segments.QUERY]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(50),
    content: Joi.string().trim().allow('').max(500),
    tag: Joi.string().valid(TAGS),
  }).min(1),
};
