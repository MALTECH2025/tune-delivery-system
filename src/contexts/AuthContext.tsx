
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Define types for our user data
export interface User {
  id: string;
  email: string;
  name: string;
  opayWallet?: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    opayWallet: ''
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for logged in user on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('malpinohdistro_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // This would normally be an API call to your backend
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = foundUser;
        
        // Save to state and localStorage
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
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

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      if (mockUsers.some(u => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        opayWallet: '',
      };
      
      // In a real app, this would be an API call
      // mockUsers.push({ ...newUser, password });
      
      // Save to state and localStorage
      setUser(newUser);
      setIsAuthenticated(true);
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

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('malpinohdistro_user');
    navigate('/login');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Update user function (for updating profile, OPay wallet, etc.)
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
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
