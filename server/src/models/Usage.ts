import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
  apiKey: String,
  date: { type: Date, default: Date.now },
  hourlyCount: { type: Number, default: 0 },
  dailyCount: { type: Number, default: 0 },
  monthlyCount: { type: Number, default: 0 },
  lastUpdated: Date
});

export const Usage = mongoose.model('Usage', usageSchema);
