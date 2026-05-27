import React, { createContext, useContext, useState, useEffect } from 'react';

// Create App Context
const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info') => {
    setNotifications(prev => [...prev, { id: Date.now(), message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== Date.now()));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      isLoading,
      setIsLoading,
      notifications,
      showNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};