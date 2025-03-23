
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  opayWallet?: string;
  isAdmin?: boolean;
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly' | null;
  subscriptionExpiryDate?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    opayWallet: '',
    isAdmin: false,
    subscriptionPlan: null,
    subscriptionExpiryDate: null
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    opayWallet: '',
    isAdmin: true,
    subscriptionPlan: null,
    subscriptionExpiryDate: null
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('malpinohdistro_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.isAdmin || false);
      
      // Check if user has active subscription
      if (parsedUser.subscriptionPlan && parsedUser.subscriptionExpiryDate) {
        const expiryDate = new Date(parsedUser.subscriptionExpiryDate);
        setHasActiveSubscription(expiryDate > new Date());
      } else {
        setHasActiveSubscription(false);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        setIsAdmin(userWithoutPassword.isAdmin || false);
        
        // Check if user has active subscription
        if (userWithoutPassword.subscriptionPlan && userWithoutPassword.subscriptionExpiryDate) {
          const expiryDate = new Date(userWithoutPassword.subscriptionExpiryDate);
          setHasActiveSubscription(expiryDate > new Date());
        } else {
          setHasActiveSubscription(false);
        }
        
        localStorage.setItem('malpinohdistro_user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mockUsers.some(u => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        opayWallet: '',
        isAdmin: false,
        subscriptionPlan: null,
        subscriptionExpiryDate: null
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      setHasActiveSubscription(false);
      localStorage.setItem('malpinohdistro_user', JSON.stringify(newUser));
      
      toast({
        title: "Signup successful",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Signup error",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
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
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
