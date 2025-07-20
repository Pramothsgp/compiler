import { User } from '../models/User';

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const createUser = (email: string, password: string, apiKey: string, plan: string) => {
  const user = new User({ email, password, apiKey, plan });
  return user.save();
};
