// CONTEXTO DE AUTENTICAÇÃO

'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
  sub: string;
  email: string;
  name?: string;
  role: string; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('nextbook.token');
    if (token) {
      try {
        const decodedToken: User = jwtDecode(token);
        setUser(decodedToken);
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error("Token inválido ou expirado", error);
        Cookies.remove('nextbook.token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (accessToken: string) => {
    Cookies.set('nextbook.token', accessToken, { expires: 7 });
    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    try {
      const decodedToken: User = jwtDecode(accessToken);
      setUser(decodedToken);
      router.push('/');
    } catch (error) {
      console.error("Falha ao decodificar token durante o login", error);
      logout();
    }
  };

  const logout = () => {
    Cookies.remove('nextbook.token');
    setUser(null);
    delete api.defaults.headers['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};