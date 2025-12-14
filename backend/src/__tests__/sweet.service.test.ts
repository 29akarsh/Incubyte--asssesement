import { SweetService } from '../services/sweet.service';
import { connectDatabase, disconnectDatabase } from '../config/database';
// Increase timeout for database connection (Atlas/network may be slower than local)
jest.setTimeout(30000);

describe('SweetService', () => {
  let sweetService: SweetService;

  beforeAll(async () => {
    await connectDatabase();
    sweetService = new SweetService();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('createSweet', () => {
    it('should create a new sweet successfully', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious milk chocolate'
      };

      const result = await sweetService.createSweet(sweetData);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe(sweetData.name);
      expect(result.category).toBe(sweetData.category);
      expect(result.price).toBe(sweetData.price);
      expect(result.quantity).toBe(sweetData.quantity);
    });

    it('should throw error if required fields are missing', async () => {
      const invalidData = {
        name: 'Test',
        category: 'Test'
        // missing price and quantity
      } as any;

      await expect(sweetService.createSweet(invalidData)).rejects.toThrow();
    });
  });

  describe('getAllSweets', () => {
    beforeEach(async () => {
      await sweetService.createSweet({
        name: 'Gummy Bears',
        category: 'Gummy',
        price: 1.99,
        quantity: 50
      });
    });

    it('should return all sweets', async () => {
      const sweets = await sweetService.getAllSweets();

      expect(Array.isArray(sweets)).toBe(true);
      expect(sweets.length).toBeGreaterThan(0);
    });
  });

  describe('searchSweets', () => {
    beforeEach(async () => {
      await sweetService.createSweet({
        name: 'Dark Chocolate',
        category: 'Chocolate',
        price: 3.99,
        quantity: 30
      });
      await sweetService.createSweet({
        name: 'Lollipop',
        category: 'Hard Candy',
        price: 0.99,
        quantity: 200
      });
    });

    it('should search sweets by name', async () => {
      const results = await sweetService.searchSweets({ name: 'Chocolate' });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toContain('Chocolate');
    });

    it('should search sweets by category', async () => {
      const results = await sweetService.searchSweets({ category: 'Chocolate' });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].category).toBe('Chocolate');
    });

    it('should search sweets by price range', async () => {
      const results = await sweetService.searchSweets({ minPrice: 1, maxPrice: 2 });

      expect(results.length).toBeGreaterThan(0);
      results.forEach(sweet => {
        expect(sweet.price).toBeGreaterThanOrEqual(1);
        expect(sweet.price).toBeLessThanOrEqual(2);
      });
    });
  });

  describe('updateSweet', () => {
    it('should update sweet details', async () => {
      const sweet = await sweetService.createSweet({
        name: 'Original Name',
        category: 'Test',
        price: 1.00,
        quantity: 10
      });

      const updated = await sweetService.updateSweet(sweet.id, {
        name: 'Updated Name',
        price: 2.00
      });

      expect(updated.name).toBe('Updated Name');
      expect(updated.price).toBe(2.00);
      expect(updated.category).toBe('Test'); // unchanged
    });
  });

  describe('deleteSweet', () => {
    it('should delete a sweet', async () => {
      const sweet = await sweetService.createSweet({
        name: 'To Delete',
        category: 'Test',
        price: 1.00,
        quantity: 10
      });

      await sweetService.deleteSweet(sweet.id);

      const sweets = await sweetService.getAllSweets();
      const found = sweets.find(s => s.id === sweet.id);
      expect(found).toBeUndefined();
    });
  });

  describe('purchaseSweet', () => {
    it('should decrease quantity when purchasing', async () => {
      const sweet = await sweetService.createSweet({
        name: 'Purchase Test',
        category: 'Test',
        price: 1.00,
        quantity: 10
      });

      const updated = await sweetService.purchaseSweet(sweet.id, 3);

      expect(updated.quantity).toBe(7);
    });

    it('should throw error if insufficient quantity', async () => {
      const sweet = await sweetService.createSweet({
        name: 'Low Stock',
        category: 'Test',
        price: 1.00,
        quantity: 2
      });

      await expect(sweetService.purchaseSweet(sweet.id, 5)).rejects.toThrow();
    });
  });

  describe('restockSweet', () => {
    it('should increase quantity when restocking', async () => {
      const sweet = await sweetService.createSweet({
        name: 'Restock Test',
        category: 'Test',
        price: 1.00,
        quantity: 10
      });

      const updated = await sweetService.restockSweet(sweet.id, 20);

      expect(updated.quantity).toBe(30);
    });
  });
});

