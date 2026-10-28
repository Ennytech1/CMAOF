import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = '/api/auth';

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('cmaof_admin_token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate session on boot
  useEffect(() => {
    const initAuth = async () => {
      const currentToken = localStorage.getItem('cmaof_admin_token');
      if (currentToken) {
        try {
          const res = await axios.get(`${API_BASE}/me`, {
            headers: { Authorization: `Bearer ${currentToken}` },
          });
          if (res.data?.success && res.data.user) {
            setUser(res.data.user);
            setToken(currentToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        } catch {
          // Token expired or invalid
          console.warn('Session verification failed, logging out');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login: Step 1
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_BASE}/login`, {
        email: email.trim(),
        password,
      });

      const data = res.data;

      // If MFA is required for admin/staff, return challenge payload without saving full token yet
      if (data.requireMfa) {
        return {
          requireMfa: true,
          email: data.email,
          name: data.name,
          role: data.role,
          demoOtpHint: data.demoOtpHint,
        };
      }

      // Standard login
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('cmaof_admin_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP: Step 2 for 2FA / MFA
  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_BASE}/verify-otp`, {
        email: email.trim(),
        otp,
      });

      const data = res.data;
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('cmaof_admin_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'MFA verification failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (name, email, password, role = 'donor') => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_BASE}/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      const data = res.data;
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('cmaof_admin_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`).catch(() => {});
    } finally {
      setUser(null);
      setToken('');
      localStorage.removeItem('cmaof_admin_token');
      localStorage.removeItem('user');
    }
  };

  // Update Profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.put(`${API_BASE}/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem('cmaof_admin_token')}`,
        },
      });

      const data = res.data;
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Profile update failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = Boolean(user && (token || localStorage.getItem('cmaof_admin_token')));
  const isAdmin = user?.role === 'admin' || user?.role === 'staff';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        login,
        verifyOtp,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
