import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarkerImg from '../images/map-marker.png';
import MapView, { Marker } from 'react-native-maps';
import { BorderlessButton } from 'react-native-gesture-handler';

interface OrphanageItemProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  deleteModal(orphanageId: number): void;
}

export default function OrphanageItem({ id, name, latitude, longitude, deleteModal }: OrphanageItemProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          zoomEnabled={false}
          pitchEnabled={false}
          scrollEnabled={false}
          rotateEnabled={false}
          style={styles.map}
          onPress={() => {navigation.navigate('OrphanageDetails', { id })}}
        >
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude, longitude }}
          />
        </MapView>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{name}</Text>
        <View style={styles.operations}>
        <BorderlessButton onPress={() => navigation.navigate('EditOrphanage', { id })}>
          <Feather color='#15C3D6' name='edit-2' size={22} />
        </BorderlessButton>
        <BorderlessButton onPress={() => deleteModal(id)}>
          <Feather color='#D6487B' name='trash-2' size={22} />
        </BorderlessButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
    overflow: 'hidden',

    borderRadius: 15,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,

    elevation: 7
  },

  label: {
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
  },

  mapContainer: {
    height: 200,
  },

  map: {
    flex: 1,
  },

  labelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },
  
  operations: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 110,
    justifyContent:'space-between'
  }
});