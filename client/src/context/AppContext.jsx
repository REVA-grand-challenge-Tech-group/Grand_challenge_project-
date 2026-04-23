import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../utils/translations';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || null;
  });

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  useEffect(() => {
    if (language) localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (role) localStorage.setItem('role', role);
  }, [role]);

  return (
    <AppContext.Provider value={{ language, setLanguage, role, setRole, t }}>
      {children}
    </AppContext.Provider>
  );
};