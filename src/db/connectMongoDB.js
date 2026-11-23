import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URL;
    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB successfully');

    await Note.syncIndexes();
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
    process.exit(1);
  }
};
