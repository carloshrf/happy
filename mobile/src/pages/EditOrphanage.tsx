import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/auth';

import api from '../services/api';

interface OrphanageDataRouteParams {
  id: number;
}

interface ResponseProps {
  name: string;
  latitude: number;
  longitude: number;
  instructions: string;
  whatsapp: string;
  about: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<
    {
      id: number;
      url: string;
    } 
  >;
}

interface ImagesStateProps {
  id: number;
  url: string;
}

export default function EditOrphanage() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<ImagesStateProps[]>([]);

  const route = useRoute();

  const params = route.params as OrphanageDataRouteParams;
  const navigation = useNavigation();

  const { token } = useAuth();
  const { id } = params;


  async function handleEditOrphanage() {

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image.url,
      } as any)
    });

    try {
      await api.patch(`orphanages/${id}`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

    } catch(err) {
      console.log(err);
    }
    
    navigation.navigate('Dashboard');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('É importante que tenhamos acesso às suas fotos :/');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    // const allImages = 

    // setImages([...images, uri]);
  }

  useEffect(() => {
    api.get(`/orphanages/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { 
        name, 
        latitude, 
        longitude, 
        instructions, 
        whatsapp,
        about, 
        opening_hours, 
        open_on_weekends, 
        images 
      } = response.data as ResponseProps;

      setName(name);
      setLatitude(latitude);
      setLongitude(longitude);
      setInstructions(instructions);
      setAbout(about);
      setWhatsapp(whatsapp);
      setOpeningHours(opening_hours);
      setOpenOnWeekends(open_on_weekends);
      setImages(images);

    })
    .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={about}
        onChangeText={text => setAbout(text)}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={text => setWhatsapp(text)}
      />

      <Text style={styles.label}>Fotos</Text>
    
      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image 
              key={image.id}
              source={{ uri: image.url }}
              style={styles.uploadedImage}
            />
          )
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={instructions}
        onChangeText={text => setInstructions(text)}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={text => setOpeningHours(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleEditOrphanage}>
        <Text style={styles.nextButtonText}>Salvar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})