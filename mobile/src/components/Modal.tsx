  
import React from 'react';

import { StyleSheet, Text, View }  from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

interface ModalProperties{
  onClose(): void;
  onDelete(): void;
  visible: boolean;
}

const Modal: React.FC<ModalProperties> = ({ onClose, onDelete, visible }) => {

  
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Deseja mesmo remover este orfanato?</Text>
        <View style={styles.buttonContainer}>
          <RectButton onPress={onClose} style={styles.button}><Text>Cancelar</Text></RectButton>
          <RectButton style={styles.deleteButton} onPress={onDelete}><Text>Remover</Text></RectButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 20

  },
  modalContent: {
    width: 300,
    borderWidth: 1,
    borderColor: '#D6487B',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    textAlign: 'center',
    paddingBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    width: 85,
    height: 35,
    backgroundColor: '#15C3D6'
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    width: 85,
    height: 35,
    backgroundColor: '#D6487B'
  }
});

export default Modal;