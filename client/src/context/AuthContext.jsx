import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userPhone', userData.phone);
    // DO NOT clear language and role here - they should persist
  };

  const logout = () => {
    setUser(null);
    // Clear only user data, keep language and role? Or clear everything?
    // For better UX, clear everything on logout
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    // Optionally keep language and role? Your call
    // localStorage.removeItem('language');
    // localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};