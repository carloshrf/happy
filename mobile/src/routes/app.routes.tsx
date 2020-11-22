import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import OrphanagesMap from '../pages/OrphanagesMap';
import OrphanageDetails from '../pages/OrphanageDetails';
import Login from '../pages/Login';

const App = createStackNavigator();

export default function Routes() {
  return (

    <NavigationContainer>
      <App.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>

        <App.Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap}
        />

        <App.Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Orfanato' />
          }}
        />

        <App.Screen 
          name="Login"
          component={Login}
        />
        
      </App.Navigator>
    </NavigationContainer>
  )
}