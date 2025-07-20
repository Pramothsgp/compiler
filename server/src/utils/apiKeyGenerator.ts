import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { randomBytes } from 'crypto';

export const generateApiKey = (): string => {
  return randomBytes(32).toString('hex'); // 64-character API key
};

export const generateToken = (userId: string): string => {
    
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId } as JwtPayload,
    secret,
    {
      expiresIn: '1d',
    }
  );
};