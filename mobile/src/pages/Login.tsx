import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/auth';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  async function handleSubmit() {
    try {
      signIn({email, password});
    } catch(err) {
      console.log(err);
    }
  }

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input 
        title='E-mail'
        value={email}
        setValue={setEmail}
      />

      <Input 
        title='Senha'
        value={password}
        setValue={setPassword}
        password={true}
      />

      <Button onPress={handleSubmit}>
        Entrar
      </Button>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },

  title: {
    fontSize: 32,
    color: '#000'
  },
});