import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  password: string;
  apiKey?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  apiKey: String,
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

export const User = mongoose.model<IUser>('User', userSchema);
