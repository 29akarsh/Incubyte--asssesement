import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../src/config/database';
import User from '../src/models/user.model';
import Sweet from '../src/models/sweet.model';

const seedDatabase = async () => {
  try {
    await connectDatabase();

    console.log('Seeding MongoDB...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.updateOne(
      { email: 'admin@sweetshop.com' },
      { $setOnInsert: { email: 'admin@sweetshop.com', password: hashedPassword, name: 'Admin User', role: 'admin' } },
      { upsert: true }
    );

    const userPassword = await bcrypt.hash('user123', 10);
    await User.updateOne(
      { email: 'user@sweetshop.com' },
      { $setOnInsert: { email: 'user@sweetshop.com', password: userPassword, name: 'Regular User', role: 'user' } },
      { upsert: true }
    );

    // Seed some sweets
    const sweets = [
      { name: 'Milk Chocolate Bar', category: 'Chocolate', price: 2.99, quantity: 100, description: 'Creamy milk chocolate' },
      { name: 'Dark Chocolate Bar', category: 'Chocolate', price: 3.49, quantity: 80, description: 'Rich dark chocolate' },
      { name: 'Gummy Bears', category: 'Gummy', price: 1.99, quantity: 150, description: 'Assorted fruit flavors' },
      { name: 'Lollipops', category: 'Hard Candy', price: 0.99, quantity: 200, description: 'Classic lollipops' },
      { name: 'Sour Worms', category: 'Gummy', price: 2.49, quantity: 120, description: 'Tangy sour gummy worms' },
      { name: 'Peppermint Candy', category: 'Hard Candy', price: 1.49, quantity: 90, description: 'Refreshing peppermint' },
      { name: 'Caramel Chews', category: 'Chewy', price: 2.99, quantity: 75, description: 'Soft caramel candies' },
      { name: 'Jelly Beans', category: 'Jelly', price: 3.99, quantity: 110, description: 'Assorted jelly beans' }
    ];

    for (const sweet of sweets) {
      const pricePaise = Math.round(sweet.price * 100);
      await Sweet.updateOne(
        { name: sweet.name },
        { $setOnInsert: { name: sweet.name, category: sweet.category, price_paise: pricePaise, quantity: sweet.quantity, description: sweet.description } },
        { upsert: true }
      );
    }

    // Migrate any legacy documents that still have `price` (float) to `price_paise` (integer)
    const legacyDocs = await Sweet.find({ price: { $exists: true }, price_paise: { $exists: false } }).lean();
    if (legacyDocs.length > 0) {
      console.log(`Migrating ${legacyDocs.length} legacy sweets to paise-based prices...`);
      for (const d of legacyDocs) {
        try {
          const rupees = (d as any).price as number;
          const paise = Math.round(rupees * 100);
          await Sweet.updateOne({ _id: d._id }, { $set: { price_paise: paise }, $unset: { price: '' } });
        } catch (e) {
          console.warn('Failed migrating sweet', d._id, e);
        }
      }
    }

    console.log('MongoDB seeded successfully!');
    console.log('\nTest credentials:');
    console.log('Admin - Email: admin@sweetshop.com, Password: admin123');
    console.log('User - Email: user@sweetshop.com, Password: user123');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
};

seedDatabase();

