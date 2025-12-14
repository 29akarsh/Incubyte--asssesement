import dotenv from 'dotenv';

// Load environment variables before importing other modules so they pick up config
dotenv.config();

import app from './app';
import { initDatabase } from './config/init-db';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();
    console.log('Database initialized successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

