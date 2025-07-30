"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage, cookies, or make API call)
    const checkAuthStatus = async () => {
      try {
        // Mock user data - in a real app, this would come from your API
        const mockUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@admybrand.com',
          role: 'Administrator',
          avatar: 'A',
          lastLogin: new Date().toLocaleDateString()
        };

        // Simulate API call to check authentication
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, you would validate the token with your API
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API login call
      if (email === 'admin@admybrand.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@admybrand.com',
          role: 'Administrator',
          avatar: 'A',
          lastLogin: new Date().toLocaleDateString()
        };
        
        const token = 'mock-jwt-token';
        localStorage.setItem('authToken', token);
        setUser(mockUser);
        router.push('/');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Clear user state
    setUser(null);
    
    // Redirect to login page
    router.push('/login');
    
    // Optional: Show logout notification
    console.log('User logged out successfully');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      // In a real app, you would also update this on the server
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}