import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, plan } = req.body;

    const { token, apiKey } = await authService.registerUser(email, password, plan);

    res.status(201).json({
      message: 'User registered',
      token,
      apiKey,
    });
  } catch (err: any) {
    const message = err.message || 'Internal server error';
    const status = err.message === 'Email already registered' ? 400 : 500;
    res.status(status).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token, apiKey } = await authService.loginUser(email, password);

    res.json({
      message: 'Login successful',
      token,
      apiKey,
    });
  } catch (err: any) {
    const message = err.message || 'Internal server error';
    const status = err.message === 'Invalid credentials' ? 401 : 500;
    res.status(status).json({ error: message });
  }
};
