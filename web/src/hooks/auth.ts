import React, { createContext ,useContext } from 'react';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const authContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({}) {

}
