import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../hooks/auth';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    if (user) {
      navigation.navigate('SelectMapPosition');
    } else {
      navigation.navigate('Login');
    }
  }

  function handleAccess() {
    if (user) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Login');
    }
  }

  useFocusEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data));
  });

  return (
    <View style={styles.container}>
      <View style={styles.accessView}>
        <RectButton style={styles.accessButton} onPress={handleAccess}>
          { !!user
            ? <Feather name="home" size={20} color="#FFF" />
            : <Feather name="log-in" size={20} color="#FFF" />
          }
        </RectButton>
      </View>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -3.7756536,
          longitude: -38.5181105,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id} 
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accessView: {
    position: 'absolute',
    right: 24,
    top: 40,

    zIndex: 2
  },
  accessButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: "100%",
  },

  calloutContainer: {
    width: 168,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 2,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }
});