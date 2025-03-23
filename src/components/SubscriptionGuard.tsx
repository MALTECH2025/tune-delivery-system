
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { hasActiveSubscription, isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();

  // Admin can access everything without a subscription
  if (isAdmin) {
    return <>{children}</>;
  }

  // Non-admins need an active subscription
  if (isAuthenticated && !hasActiveSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
