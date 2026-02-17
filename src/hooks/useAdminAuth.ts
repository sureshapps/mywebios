import { useState, useCallback } from 'react';

const ADMIN_KEY = 'ios-admin-auth';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_KEY) === 'true';
  });

  const login = useCallback((email: string, password: string): boolean => {
    // Demo credentials — this is a client-side demo, not production auth
    if (email === 'admin@example.com' && password === 'admin123') {
      sessionStorage.setItem(ADMIN_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
};
