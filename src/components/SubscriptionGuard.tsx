
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { hasActiveSubscription, isAdmin } = useAuth();

  // Admin can access everything without a subscription
  if (isAdmin) {
    return <>{children}</>;
  }

  // Non-admins need an active subscription
  if (!hasActiveSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
