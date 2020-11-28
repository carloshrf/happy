import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Modal from '../components/Modal';
import Buttom from '../components/Button';
import OrphanageItem from '../components/OrphanageItem';
import { useAuth } from '../hooks/auth';
import api from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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
  const [orphanageId, setOrphanageId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigator = useNavigation();
  const {token, user} = useAuth();
  const  { id } = user as UserProps;

  function toggleDeleteModal(orphanageId: number) {
    setDeleteModal(!deleteModal);
    setOrphanageId(orphanageId);
  }

  function handleDeleteOrphanage() {
    api.delete(`orphanages/${orphanageId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(response => console.log(response.status));
    
    setOrphanages(orphanages.filter(orphanage => orphanage.id !== orphanageId));
    setDeleteModal(!deleteModal);
    setOrphanageId(0);
  }

  useFocusEffect(() => {
    setDeleteModal(false);
    api.get(`/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(response => setOrphanages(response.data.orphanages))
    .catch(err => console.log(err));

  });
  
  return (
    <>
      <View style={styles.page}>
        <ScrollView>
          <View style={styles.container}>
            {orphanages && orphanages.map(orphanage => (
              <OrphanageItem 
                key={orphanage.id}
                id={orphanage.id}
                name={orphanage.name}
                longitude={orphanage.longitude}
                latitude={orphanage.latitude}
                deleteModal={toggleDeleteModal}
              />
            ))}
          </View>
        </ScrollView>
        <Buttom style={styles.createButton} onPress={() => navigator.navigate('SelectMapPosition')}>Adicionar orfanato</Buttom>

      </View>
      { !!deleteModal
        ? (<Modal 
            visible={deleteModal}
            onClose={() => setDeleteModal(!deleteModal)} 
            onDelete={handleDeleteOrphanage} 
          />)
        : null
      }
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 30,
    paddingBottom: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  createButton: {
    position: 'absolute',
    top: 10,
  }
});