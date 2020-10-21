import React, { createContext ,useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
  user: object,
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Happy:token');
    const user = localStorage.getItem('@Happy:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@Happy:token', token);
    localStorage.setItem('@Happy:user', JSON.stringify(user));

    setData({} as AuthState);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Happy:token');
    localStorage.removeItem('@Happy:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth deve ser usado com um AuthProvider');
  }

  return authContext;
}