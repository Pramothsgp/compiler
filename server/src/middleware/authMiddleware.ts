import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ error: 'API key required' });

    const user = await User.findOne({ apiKey });
    if (!user) return res.status(403).json({ error: 'Invalid API key' });
    (req as any).user = user;
    next();
};
