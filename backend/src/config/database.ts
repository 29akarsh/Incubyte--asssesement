import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb+srv://Akarsh_9170:<Roy@lEnfield350>@sweet-shop.542wicp.mongodb.net/?appName=sweet-shop';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // options can be added if needed
    } as any);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
};

export default mongoose;

