import mongoose from 'mongoose';
import User from '../models/user.model';
import Sweet from '../models/sweet.model';
import { connectDatabase } from './database';

export const initDatabase = async () => {
  // Connect to MongoDB and ensure indexes are created by models
  await connectDatabase();

  try {
    // Ensure indexes defined on schemas are created
    await User.init();
    try {
      await Sweet.init();
    } catch (err: any) {
      // MongoDB allows only one text index per collection. If there's an existing
      // legacy text index from previous schema, ignore that specific error and continue.
      if (err && err.message && err.message.includes('only one text index per collection allowed')) {
        console.warn('Text index already exists on sweets collection; skipping creation.');
      } else {
        throw err;
      }
    }

    console.log('MongoDB collections and indexes are ready');
  } catch (error) {
    console.error('Error initializing MongoDB:', error);
    throw error;
  }
};

export const dropCollections = async () => {
  try {
    const db = mongoose.connection;
    await db.dropCollection('sweets').catch(() => {});
    await db.dropCollection('users').catch(() => {});
    console.log('Dropped collections (if existed)');
  } catch (error) {
    console.error('Error dropping collections:', error);
    throw error;
  }
};

