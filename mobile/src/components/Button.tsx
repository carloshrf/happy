import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
  onPress(): void;
}

export default function Button({children, onPress}: ButtonProps) {
  return (
    <RectButton style={styles.loginButton} onPress={onPress}>
      <Text>{children}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%'
  },
});