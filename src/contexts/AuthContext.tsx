import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthUser } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: AuthUser;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'client' | 'freelancer') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(user => user.email === email);
        
        if (user) {
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'client' | 'freelancer'
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
          resolve(false);
        } else {
          // In a real app, this would be handled by the backend
          const newUser: User = {
            id: (users.length + 1).toString(),
            name,
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            joinedAt: new Date()
          };
          
          // In a real application, we would add this user to the database
          // For this demo, we'll just set it as the current user
          setCurrentUser(newUser);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};