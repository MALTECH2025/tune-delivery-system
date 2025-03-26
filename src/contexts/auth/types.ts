
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  opayWallet?: string;
  isAdmin?: boolean;
  role?: 'admin' | 'artist';
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly' | null;
  subscriptionExpiryDate?: string | null;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<UserProfile>) => void;
}
