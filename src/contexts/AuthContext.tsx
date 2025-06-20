
import React, { createContext, useContext, useState } from 'react';

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

// Mock user data
const mockUser = {
  id: 'mock_user_123',
  display_name: 'Demo User',
  email: 'demo@soundflow.com',
  followers: { total: 42 },
  images: [
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face'
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken] = useState<string>('mock_access_token');
  const [user] = useState<any>(mockUser);

  const setTokenFromUrl = () => {
    // Mock implementation - no actual URL parsing needed
    console.log('Mock: Token set from URL');
  };

  const login = () => {
    console.log('Mock: Login initiated');
  };

  const logout = () => {
    console.log('Mock: User logged out');
  };

  const value = {
    accessToken,
    user,
    isAuthenticated: true, // Always authenticated with mock data
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
