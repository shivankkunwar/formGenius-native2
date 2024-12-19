import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 4,
    marginVertical: 8,
  },
  text: {
    color: '#b71c1c',
    textAlign: 'center',
  },
});