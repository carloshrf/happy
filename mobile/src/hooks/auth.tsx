import React, { useContext, createContext, useState, useEffect} from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';

interface AuthState {
  token: string;
  user: UserProps;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInProps): Promise<void>;
  token: string;
  signOut(): void;
}

interface UserProps {
  id: number;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Happy:token',
        '@Happy:user',
      ]);

      !!token[1] && user[1] && setData({ 
        token: token[1], 
        user: JSON.parse(user[1])
      });

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn({ email, password }: SignInProps)  {
    try {
      const response = await api.post('/sessions', {email, password});

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@Happy:token', token],
        ['@Happy:user', JSON.stringify(user)]
      ]);

      setData({ token, user });

    } catch (err) {
      Alert.alert('Erro na autenticação', `${err}`);
    }
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.multiRemove([
      '@Happy:token',
      '@Happy:user'
    ]);

    setData({} as AuthState);
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading, token: data.token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser chamado apenas com o AuthProvider');
  }

  return context;
}