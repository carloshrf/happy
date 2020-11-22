import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import OrphanageItem from '../components/OrphanageItem';
import { useAuth } from '../hooks/auth';
import api from '../services/api';

interface UserProps {
  id: number;
  email: string;
  name: string;
}

interface OrphanageProps {
  id: number;
  latitude: number,
  longitude: number,
  name: string;
}

export default function Dashboard() {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  const {token, user} = useAuth();
  const  { id } = user as UserProps;

  useEffect(() => {
    api.get(`/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(response => setOrphanages(response.data.orphanages))
    .catch(err => console.log(err));

  }, []);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        {orphanages && orphanages.map(orphanage => (
          <OrphanageItem 
            key={orphanage.id}
            id={orphanage.id}
            name={orphanage.name}
            longitude={orphanage.longitude}
            latitude={orphanage.latitude}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30
  }
});