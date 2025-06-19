
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setTokenFromUrl: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const setTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    
    if (token) {
      setAccessToken(token);
      localStorage.setItem('spotify_access_token', token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const login = () => {
    window.location.href = 'http://localhost:4000/login';
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('spotify_access_token');
  };

  useEffect(() => {
    // Check for token in URL first
    setTokenFromUrl();
    
    // Then check localStorage
    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken && !accessToken) {
      setAccessToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Fetch user profile
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Token invalid:', data.error);
          logout();
        } else {
          setUser(data);
        }
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
    }
  }, [accessToken]);

  const value = {
    accessToken,
    user,
    isAuthenticated: !!accessToken,
    login,
    logout,
    setTokenFromUrl
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
