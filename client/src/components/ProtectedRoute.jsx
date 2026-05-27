import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext) || {};
  const backupUser = localStorage.getItem('user');

  // If no user object exists in memory or localStorage, bounce them to Step 1
  if (!user && !backupUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;