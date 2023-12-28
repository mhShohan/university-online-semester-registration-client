import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteProtectionProps {
  children: React.ReactNode;
}

const RouteProtection = ({ children }: RouteProtectionProps) => {
  const { user, loading } = { user: true, loading: false };

  const location = useLocation();

  if (loading) {
    return <h1>loading</h1>;
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default RouteProtection;
