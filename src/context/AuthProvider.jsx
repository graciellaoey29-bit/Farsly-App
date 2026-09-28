import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    try {
      const storedUser = localStorage.getItem('farsly_user');
      const parsed = storedUser ? JSON.parse(storedUser) : null;
      // Validate token structure
      if (parsed && (!parsed.id || !parsed.role)) {
        localStorage.removeItem('farsly_user');
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem('farsly_user');
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('farsly_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farsly_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
