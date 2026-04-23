import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { language, role } = useApp();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!language) {
    return <Navigate to="/language" replace />;
  }

  if (!role) {
    return <Navigate to="/role" replace />;
  }

  return children;
};

export default ProtectedRoute;