import { AuthService } from '../services/auth.service';
import { connectDatabase, disconnectDatabase } from '../config/database';
// Increase timeout for database connection (Atlas/network may be slower than local)
jest.setTimeout(30000);
import User from '../models/user.model';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    await connectDatabase();
    authService = new AuthService();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const result = await authService.register(userData);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(userData.email);
      expect(result.user.name).toBe(userData.name);
      expect(result.user).not.toHaveProperty('password');
    });

    it('should not register a user with duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await authService.register(userData);

      await expect(authService.register(userData)).rejects.toThrow();
    });

    it('should hash the password before storing', async () => {
      const userData = {
        email: 'hash-test@example.com',
        password: 'plainPassword',
        name: 'Hash Test'
      };
      await authService.register(userData);

      const u = await User.findOne({ email: userData.email }).lean();
      expect(u).toBeTruthy();
      expect(u!.password).not.toBe(userData.password);
      expect(u!.password).toMatch(/^\$2[aby]\$/);
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await authService.register({
        email: 'login-test@example.com',
        password: 'password123',
        name: 'Login Test'
      });
    });

    it('should login with correct credentials', async () => {
      const result = await authService.login({
        email: 'login-test@example.com',
        password: 'password123'
      });

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('login-test@example.com');
    });

    it('should reject login with incorrect password', async () => {
      await expect(
        authService.login({
          email: 'login-test@example.com',
          password: 'wrongpassword'
        })
      ).rejects.toThrow();
    });

    it('should reject login with non-existent email', async () => {
      await expect(
        authService.login({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
      ).rejects.toThrow();
    });
  });
});

