import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import OrphanageData from '../pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from '../pages/CreateOrphanage/SelectMapPosition';
import OrphanagesMap from '../pages/OrphanagesMap';
import Dashboard from '../pages/Dashboard';
import OrphanageDetails from '../pages/OrphanageDetails';
import EditOrphanage from '../pages/EditOrphanage';

const Auth = createStackNavigator();

export default function AuthRoutes() {
  return (
    <NavigationContainer>
      <Auth.Navigator 
        screenOptions={{ 
          headerShown: false, 
          cardStyle: { backgroundColor: '#f2f3f5' } 
        }}
      >
        <Auth.Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap}
        />
        
        <Auth.Screen 
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Dashboard' />
          }}
        />

        
        <Auth.Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails} 
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Orfanato' />
          }}
        />

        <Auth.Screen 
          name="OrphanageData" 
          component={OrphanageData} 
          options={{
            headerShown: true,
            header: () => <Header title='Selecione no mapa' />
          }}
        />
        
        <Auth.Screen 
          name="EditOrphanage" 
          component={EditOrphanage} 
          options={{
            headerShown: true,
            header: () => <Header title='Editar orfanato' />
          }}
        />

        <Auth.Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition} 
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />
          }}
        />
        
      </Auth.Navigator>
    </NavigationContainer>
  )
}