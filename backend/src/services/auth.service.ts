import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { AuthRequest, AuthResponse } from '../types';

export class AuthService {
  private readonly JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
  private readonly JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '24h';

  async register(userData: AuthRequest): Promise<AuthResponse> {
    const { email, password, name } = userData;

    if (!email || !password || !name) {
      throw new Error('Email, password, and name are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await User.create({ email, password: hashedPassword, name, role: 'user' });

    const token = jwt.sign(
      { id: created._id.toString(), email: created.email, role: created.role },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN } as SignOptions
    );

    return {
      token,
      user: {
        id: created._id.toString() as any,
        email: created.email,
        name: created.name,
        role: created.role
      }
    };
  }

  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN } as SignOptions
    );

    return {
      token,
      user: {
        id: user._id.toString() as any,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}

