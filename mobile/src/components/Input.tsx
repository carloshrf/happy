import React from 'react';
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  title: string;
  password?: boolean;
  setValue(text: string): void;
}

export default function Input({ title, password = false, value, setValue }: InputProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput 
        style={styles.input}
        secureTextEntry={password}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },

  title: {
    fontSize: 20,
    color: '#000',
    paddingBottom: 5
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
});