import bcrypt from 'bcryptjs';
import { generateApiKey, generateToken } from '../utils/apiKeyGenerator';
import { createUser, findUserByEmail } from '../repository/userRepository';

export const registerUser = async (email: string, password: string, plan: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const apiKey = generateApiKey();
  const user = await createUser(email, password, apiKey, plan);

  const token = generateToken(user.id.toString());

  return { token, apiKey };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id.toString());

  return { token, apiKey: user.apiKey };
};
