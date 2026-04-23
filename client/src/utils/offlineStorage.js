// Save data locally for offline access
export const saveOfflineData = (key, data) => {
  try {
    localStorage.setItem(`offline_${key}`, JSON.stringify(data));
    localStorage.setItem(`offline_${key}_timestamp`, Date.now());
  } catch (error) {
    console.error('Failed to save offline data:', error);
  }
};

export const getOfflineData = (key) => {
  try {
    const data = localStorage.getItem(`offline_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get offline data:', error);
    return null;
  }
};

export const isOffline = () => {
  return !navigator.onLine;
};

// Listen to online/offline events
export const addOfflineListener = (callback) => {
  window.addEventListener('online', () => callback(true));
  window.addEventListener('offline', () => callback(false));
};