import { initDatabase, dropCollections } from '../src/config/init-db';
import { disconnectDatabase } from '../src/config/database';

const setupDatabase = async () => {
  try {
    console.log('Setting up MongoDB...');
    await initDatabase();
    console.log('MongoDB setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB setup failed:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
};

setupDatabase();

