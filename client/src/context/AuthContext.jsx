import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    console.log('=== AUTH CONTEXT LOAD ===');
    console.log('Stored user:', storedUser);
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    console.log('=== LOGIN CALLED ===');
    console.log('User role:', userData.role);
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getRole = () => {
    const role = user?.role || localStorage.getItem('userRole') || 'farmer';
    console.log('getRole() returning:', role);
    return role;
  };

  const isFarmer = () => {
    const role = getRole();
    return role === 'farmer' || role === 'both';
  };

  const isLabourer = () => {
    const role = getRole();
    return role === 'labour' || role === 'both';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      logout,
      getRole,
      isFarmer,
      isLabourer
    }}>
      {children}
    </AuthContext.Provider>
  );
};