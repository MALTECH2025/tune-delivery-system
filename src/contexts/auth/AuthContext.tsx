
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './types';
import { useAuthProvider } from './useAuthProvider';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      isAdmin: auth.isAdmin,
      hasActiveSubscription: auth.hasActiveSubscription,
      login: auth.login,
      signup: auth.signup,
      logout: auth.logout,
      updateUser: auth.updateUser
    }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
