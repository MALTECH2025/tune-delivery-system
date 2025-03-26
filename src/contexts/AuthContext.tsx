
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

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

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile from Supabase
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
          }

          if (profile) {
            const userProfile: UserProfile = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              opayWallet: profile.opay_wallet || '',
              isAdmin: profile.admin || false,
              role: profile.role || (profile.admin ? 'admin' : 'artist'),
              subscriptionPlan: null,
              subscriptionExpiryDate: null
            };

            // Get subscription info
            const { data: subscription } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', profile.id)
              .eq('status', 'active')
              .order('end_date', { ascending: false })
              .limit(1)
              .single();

            if (subscription) {
              userProfile.subscriptionPlan = subscription.plan as 'monthly' | 'quarterly' | 'yearly';
              userProfile.subscriptionExpiryDate = subscription.end_date;
              
              const expiryDate = new Date(subscription.end_date);
              setHasActiveSubscription(expiryDate > new Date());
            } else {
              setHasActiveSubscription(false);
            }

            setUser(userProfile);
            setIsAuthenticated(true);
            setIsAdmin(userProfile.isAdmin || false);
            localStorage.setItem('malpinohdistro_user', JSON.stringify(userProfile));
          }
        } else {
          // User is logged out
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
          setHasActiveSubscription(false);
          localStorage.removeItem('malpinohdistro_user');
        }
        
        setSession(session);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Real Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: 'artist',
          }
        }
      });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      // Now let's create a profile in the profiles table directly (belt and suspenders)
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: email,
            name: name,
            admin: false,
            role: 'artist'
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }
      
      toast({
        title: "Signup successful",
        description: "Your account has been created. Please check your email to verify your account.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Signup error",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setHasActiveSubscription(false);
      localStorage.removeItem('malpinohdistro_user');
      
      navigate('/login');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  const updateUser = async (userData: Partial<UserProfile>) => {
    if (user) {
      try {
        // Update profile in Supabase
        if (session) {
          const { error } = await supabase
            .from('profiles')
            .update({
              name: userData.name || user.name,
              opay_wallet: userData.opayWallet || user.opayWallet,
              role: userData.role || user.role,
              admin: userData.isAdmin !== undefined ? userData.isAdmin : user.isAdmin
            })
            .eq('id', user.id);
          
          if (error) {
            throw error;
          }
        }
        
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        setIsAdmin(updatedUser.isAdmin || false);
        
        // Update subscription status
        if (updatedUser.subscriptionPlan && updatedUser.subscriptionExpiryDate) {
          const expiryDate = new Date(updatedUser.subscriptionExpiryDate);
          setHasActiveSubscription(expiryDate > new Date());
        } else {
          setHasActiveSubscription(false);
        }
        
        localStorage.setItem('malpinohdistro_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
      } catch (error) {
        console.error("Update user error:", error);
        toast({
          title: "Update error",
          description: "Failed to update your profile",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      hasActiveSubscription,
      login, 
      signup, 
      logout, 
      updateUser 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
