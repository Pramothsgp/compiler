import { NextFunction, Request, Response } from 'express';
import { Usage } from '../models/Usage';

const limits = {
  free: { hourly: 10, daily: 50, monthly: 200 },
  pro: { hourly: 100, daily: 500, monthly: 2000 },
  enterprise: { hourly: 1000, daily: 10000, monthly: 50000 }
};

type PlanType = keyof typeof limits;

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as { apiKey: string; plan: PlanType };
  const { apiKey, plan } = user;

  const now = new Date();

  const usage = await Usage.findOneAndUpdate(
    { apiKey },
    { $setOnInsert: { apiKey, lastUpdated: now, hourlyCount: 0, dailyCount: 0, monthlyCount: 0 } },
    { upsert: true, new: true }
  );

  if (!usage || !usage.lastUpdated) {
    return res.status(500).json({ error: 'Failed to retrieve or initialize usage record' });
  }

  if (now.getHours() !== usage.lastUpdated.getHours()) usage.hourlyCount = 0;
  if (now.getDate() !== usage.lastUpdated.getDate()) usage.dailyCount = 0;
  if (now.getMonth() !== usage.lastUpdated.getMonth()) usage.monthlyCount = 0;

  const { hourly, daily, monthly } = limits[plan];

  if (
    usage.hourlyCount >= hourly ||
    usage.dailyCount >= daily ||
    usage.monthlyCount >= monthly
  ) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  usage.hourlyCount++;
  usage.dailyCount++;
  usage.monthlyCount++;
  usage.lastUpdated = now;

  await usage.save();

  next();
};
