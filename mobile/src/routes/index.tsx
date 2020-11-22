import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';
import { ActivityIndicator, View } from 'react-native';

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="666" />
      </View>
    )
  }

  console.log(user);
  return user ? <AuthRoutes /> : <AppRoutes />;
}