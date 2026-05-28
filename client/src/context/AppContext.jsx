// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  const [role, setRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  useEffect(() => {
    if (language) localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (role) localStorage.setItem('userRole', role);
  }, [role]);

  const updateLanguage = (lang) => {
    console.log("Setting language:", lang);
    setLanguage(lang);
  };

  const updateRole = (userRole) => {
    console.log("Setting role:", userRole);
    setRole(userRole);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage: updateLanguage,
      updateLanguage,
      role,
      setRole: updateRole,
      updateRole
    }}>
      {children}
    </AppContext.Provider>
  );
};