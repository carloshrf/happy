import React from 'react';

import { AuthProvider } from './hooks/auth';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
