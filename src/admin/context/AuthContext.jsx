import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, adminLogout, getMe } from '../services/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { setLoading(false); return; }

    getMe()
      .then((res) => { if (res.success) setUser(res.user); })
      .catch(() => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await adminLogin(credentials);
    if (res.success) {
      localStorage.setItem('admin_token', res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
      setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    try { await adminLogout(); } catch (_) {}
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
